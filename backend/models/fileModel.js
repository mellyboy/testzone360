const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.run(`CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT,
    originalname TEXT,
    mimetype TEXT,
    size INTEGER,
    path TEXT
)`);

module.exports = db;
