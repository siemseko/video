const db = require('./db');
const bcrypt = require('bcrypt');

// Create the user table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )
`);

const registerUser = async (username, password, callback) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertQuery = `INSERT INTO users (username, password) VALUES (?, ?)`;
        db.run(insertQuery, [username, hashedPassword], function (err) {
            callback(err, this?.lastID);
        });
    } catch (err) {
        callback(err, null);
    }
};

const findUserByUsername = (username, callback) => {
    const selectQuery = `SELECT * FROM users WHERE username = ?`;
    db.get(selectQuery, [username], (err, row) => {
        callback(err, row);
    });
};
const getAllUsers = (callback) => {
    const selectQuery = `SELECT id, username, password FROM users`; // Avoid returning passwords
    db.all(selectQuery, [], (err, rows) => {
        callback(err, rows);
    });
};

module.exports = {
    registerUser,
    findUserByUsername,
    getAllUsers
};
