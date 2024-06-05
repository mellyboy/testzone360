const db = require('../database');
const bcrypt = require('bcryptjs');

const createUser = async (user, callback) => {
    const { firstName, lastName, address, email, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO users (first_name, last_name, address, email, password) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [firstName, lastName, address, email, hashedPassword], function(err) {
        if (err) {
            return callback(err);
        }
        callback(null, { id: this.lastID });
    });
};

module.exports = { createUser };
