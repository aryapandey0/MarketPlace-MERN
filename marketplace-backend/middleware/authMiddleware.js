const jwt = require('jsonwebtoken');
const SECRET = "marketplace_secret";

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"
  if (!token) return res.status(401).json({ error: "Token missing" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // attach user data
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied: " + req.user.role });
    }
    next();
  };
};
