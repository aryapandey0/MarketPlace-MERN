const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = "marketplace_secret"; // .env me store karna chahiye ideally

exports.register = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;

    // ✅ Allow admin shortcut
    if (email === "admin@gmail.com" && password === "123456") {
      role = "ADMIN";
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });

    await user.save();
    res.status(201).json({ message: "User registered" });

  } catch (err) {
    console.error("❌ Register error:", err);
    res.status(500).json({ error: "Registration failed", details: err.message });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: '1d' });

  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error("❌ Failed to fetch users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

