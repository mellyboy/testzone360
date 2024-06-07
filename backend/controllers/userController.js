const User = require('../models/user');
const db = require('../database'); // Ensure correct import of the db
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = (req, res) => {
    const user = req.body;

    User.createUser(user, (err, result) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ message: 'created', userId: result.id });
    });
};

exports.loginUser = async (req, res) => {
    console.log('Request body:', req.body);

    const { email, password } = req.body;
    try {
        console.log(email, password);

        db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
            if (err) {
                return res.status(500).json({ message: 'Server error' });
            }
            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            // // Log the hashed password to verify bcrypt usage
            // console.log('Hashed password:', user.password);

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            const token = jwt.sign({ id: user.id }, 'my-32-character-ultra-secure-and-ultra-long-secret', { expiresIn: '1h' });

            // console.log('JWT token:', token);

            res.json({ token, userId: user.id });
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Example middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    jwt.verify(token, 'my-32-character-ultra-secure-and-ultra-long-secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        req.user = decoded;
        next();
    });
};


exports.getUserProfile = (req, res) => {
    verifyToken(req, res, () => {
        const userId = req.query.id;
        if (!userId || userId != req.user.id) {
            return res.status(403).json({ error: "Forbidden" });
        }

        User.getUserProfile(userId, (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(row);
        });
    });
};

exports.updateUserProfile = (req, res) => {
    verifyToken(req, res, () => {
        const userData = req.body;
        if (!userData.id || userData.id != req.user.id) {
            return res.status(403).json({ error: "Forbidden" });
        }

        User.updateUserProfile(userData, (err, changes) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Profile updated successfully', changes });
        });
    });
};
