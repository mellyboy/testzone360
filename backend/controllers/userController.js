const User = require('../models/user');

const registerUser = (req, res) => {
    const user = req.body;

    User.createUser(user, (err, result) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ message: 'User created successfully', userId: result.id });
    });
};

module.exports = { registerUser };
