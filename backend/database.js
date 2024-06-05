const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

db.serialize(() => {
    // Create Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        address TEXT NOT NULL,
        account_number TEXT UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`);

    // // Create Contacts table
    // db.run(`CREATE TABLE IF NOT EXISTS contacts (
    //     id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     user_id INTEGER NOT NULL,
    //     contact_user_id INTEGER NOT NULL,
    //     FOREIGN KEY (user_id) REFERENCES users (id),
    //     FOREIGN KEY (contact_user_id) REFERENCES users (id)
    // )`);
});

module.exports = db;

