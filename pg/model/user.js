const bcrypt = require('bcrypt');
const pool = require('../db');

//function to register/create user
const createUser = async (user) => {
    try {
        const { firstName, lastName, address, email, password } = user;
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `INSERT INTO users (first_name, last_name, address, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id`;
        const { rows } = await pool.query(query, [firstName, lastName, address, email, hashedPassword]);
        return rows[0].id;
    } catch (error) {
        throw error;
    }
};

//retrieve user details by email
const getUserByEmail = async (email) => {
    try {
        const query = `SELECT * FROM users WHERE email = $1`;
        const { rows } = await pool.query(query, [email]);
        return rows[0];
    } catch (error) {
        throw error;
    }
}

//get a user profile
const getUserProfile = async (userId) => {
    try {
        const query = `
            SELECT id, first_name AS "firstName", last_name AS "lastName", address, 
                   address_line_2 AS "addressLine2", city, region, zip_code AS "zipCode", 
                   country, gender, account_number AS "accountNumber", email 
            FROM users 
            WHERE id = $1
        `;
        const { rows } = await pool.query(query, [userId]);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

//update profile
const updateUserProfile = async (userId, userData) => {
    try {
        const { firstName, lastName, address, addressLine2, city, region, zipCode, country, gender, accountNumber, email } = userData;
        const query = `
            UPDATE users 
            SET first_name = $1, last_name = $2, address = $3, address_line_2 = $4, 
                city = $5, region = $6, zip_code = $7, country = $8, gender = $9, 
                account_number = $10, email = $11 
            WHERE id = $12
        `;
        await pool.query(query, [firstName, lastName, address, addressLine2, city, region, zipCode, country, gender, accountNumber, email, userId]);
    } catch (error) {
        throw error;
    }
};

module.exports = { createUser, getUserByEmail, getUserProfile, updateUserProfile };
