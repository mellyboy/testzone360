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

            // Log the hashed password to verify bcrypt usage
            console.log('Hashed password:', user.password);

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            const token = jwt.sign({ id: user.id }, 'my-32-character-ultra-secure-and-ultra-long-secret', { expiresIn: '1h' });

            console.log('JWT token:', token);

            res.json({ token });
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
