const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts } = require('../controller/productController');
const { verifyToken, restrictTo } = require('../middleware/authMiddleware');

router.post('/add', verifyToken, restrictTo("SELLER", "ADMIN"), addProduct);
router.get('/', getAllProducts); 

module.exports = router;
