const db = require('../database');
const bcrypt = require('bcryptjs');

const createUser = async (user, callback) => {
    const { firstName, lastName, address, accountNumber, email, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO users (first_name, last_name, address, account_number, email, password) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(query, [firstName, lastName, address, accountNumber, email, hashedPassword], function(err) {
        if (err) {
            return callback(err);
        }
        callback(null, { id: this.lastID });
    });
};

module.exports = { createUser };
