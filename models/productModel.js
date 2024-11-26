const db = require('./db');

// Create the product table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    qty INTEGER NOT NULL
  )
`);

const addProduct = (name, price, qty, callback) => {
    const insertQuery = `INSERT INTO product (name, price, qty) VALUES (?, ?, ?)`;
    db.run(insertQuery, [name, price, qty], function (err) {
        callback(err, this?.lastID);
    });
};

const getAllProducts = (callback) => {
    const selectQuery = `SELECT * FROM product`;
    db.all(selectQuery, [], (err, rows) => {
        callback(err, rows);
    });
};

const deleteProduct = (id, callback) => {
    const deleteQuery = `DELETE FROM product WHERE id = ?`;
    db.run(deleteQuery, [id], function (err) {
        callback(err, this?.changes); // this.changes will indicate the number of rows deleted
    });
};


module.exports = {
    addProduct,
    getAllProducts,
    deleteProduct 
};
