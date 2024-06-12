const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        const user = req.body;
        await User.createUser(user);
        res.status(201).json({ message: 'created' });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.getUserByEmail(email);

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const secretKey = process.env.JWT_SECRET;

        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
        res.json({ token, userId: user.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const userProfile = await User.getUserProfile(userId);
        if (!userProfile) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(userProfile);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const userData = req.body;
        await User.updateUserProfile(userId, userData);
        res.json({ message: 'Profile updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
