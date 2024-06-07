const db = require('../database');
const bcrypt = require('bcryptjs');

//WAL-mode
db.exec('PRAGMA journal_mode=WAL;', (err) => {
    if (err) {
        console.error('Failed to set WAL mode:', err.message);
    }
});

//function to register/create user
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

//function to get a user profile
const getUserProfile = (userId, callback) => {
    const query = `SELECT id, first_name AS firstName, last_name AS lastName, address, address_line_2 as addressLine2, city, region, zip_code AS zipCode, country, gender, account_number as accountNumber, email FROM users WHERE id = ?`;
    db.get(query, [userId], (err, row) => {
        if (err) {
            return callback(err);
        }
        callback(null, row);
    });
};

//function to update a user profile
const updateUserProfile = (userData, callback) => {
    const { id, firstName, lastName, address, addressLine2, city, region, zipCode, country, gender, accountNumber, email } = userData;
    const query = `UPDATE users SET first_name = ?, last_name = ?, address = ?, address_line_2 = ?, city = ?, region = ?, zip_code = ?, country = ?, gender = ?, account_number = ?, email = ? WHERE id = ?`;

    //retry logic with exponential backoff
    const maxRetries = 3;
    const update = (retries) => {
        db.run(query, [firstName, lastName, address, addressLine2, city, region, zipCode, country, gender, accountNumber, email, id], function(err) {
            if (err) {
                if (err.code === 'SQLITE_BUSY' && retries < maxRetries) {
                    setTimeout(() => update(retries + 1), Math.pow(2, retries) * 100); // Exponential backoff
                } else {
                    return callback(err);
                }
            } else {
                callback(null, { changes: this.changes });
            }
        });
    };

    update(0);
};

module.exports = { createUser, getUserProfile, updateUserProfile };
