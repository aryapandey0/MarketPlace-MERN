const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  const { name, description, price, image } = req.body;
  const sellerId = req.user.id;

  try {
    const product = await Product.create({
      name, description, price, image,
      createdBy: sellerId
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: "Failed to add product", details: err });
  }
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find().populate('createdBy', 'name email role');
  res.json(products);
};
