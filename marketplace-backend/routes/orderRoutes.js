const express=require('express');
const {
  placeOrder,
  getAllOrders,
  getMyOrders
} =require('../controller/orderController.js');
const { verifyToken, restrictTo } =require("../middleware/authMiddleware.js");

const router = express.Router();

// 🛒 Customer places an order
router.post('/place', verifyToken, restrictTo('CUSTOMER'), placeOrder);

// 📄 Customer views own orders
router.get('/my', verifyToken, restrictTo('CUSTOMER'), getMyOrders);

// 📋 Admin views all orders
router.get('/all', verifyToken, restrictTo('ADMIN'), getAllOrders);

module.exports=router;
