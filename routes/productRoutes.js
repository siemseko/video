const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticateJWT = require('../middleware/authenticateJWT'); // Import the middleware

// Protect the routes by adding `authenticateJWT` middleware
router.post('/submit-product', authenticateJWT, productController.submitProduct);
router.get('/products', authenticateJWT, productController.getProducts);
router.delete('/product/:id', authenticateJWT, productController.deleteProduct);

module.exports = router;
