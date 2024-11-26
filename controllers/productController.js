const productModel = require('../models/productModel');

const submitProduct = (req, res) => {
    const { name, price, qty } = req.body;

    if (!name || !price || !qty) {
        return res.status(400).send('Name, price, and quantity are required');
    }

    productModel.addProduct(name, price, qty, (err, lastID) => {
        if (err) {
            return res.status(500).send('Failed to save the product to the database');
        }

        res.status(200).send(`Product ${name} added with ID ${lastID}`);
    });
};

const getProducts = (req, res) => {
    productModel.getAllProducts((err, rows) => {
        if (err) {
            return res.status(500).send('Failed to retrieve products from the database');
        }

        res.status(200).json({
            data: rows
        });
    });
};
const deleteProduct = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send('Product ID is required');
    }

    productModel.deleteProduct(id, (err, changes) => {
        if (err) {
            return res.status(500).send('Failed to delete the product from the database');
        }

        if (changes === 0) {
            return res.status(404).send('Product not found');
        }

        res.status(200).send(`Product with ID ${id} deleted successfully`);
    });
};

module.exports = {
    submitProduct,
    getProducts,
    deleteProduct // Export the new delete function
};
