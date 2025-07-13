const Order=require("../models/Order");


exports.placeOrder = async (req, res) => {
  try {
    const { items, total } = req.body;
    const userId = req.user.id;

    console.log("📦 Order Received:", { items, total, userId }); // 👈 ADD THIS

    const newOrder = new Order({
      user: userId,
      items,
      total
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    console.error("❌ Order Save Error:", err); // 👈 VERY IMPORTANT
    res.status(500).json({ error: 'Failed to place order' });
  }
};


exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch your orders' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
