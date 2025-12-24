const jwt = require('jsonwebtoken');
const User = require('../models/User');

// middlewares/authMiddleware.js
exports.protect = async (req, res, next) => {
  // very small stub — adapt as needed
  // if you already have real implementation keep it as-is
  if (!req.headers.authorization) {
    return res.status(401).json({ status: 'error', message: 'Not authenticated' });
  }
  // decode token and set req.user in real implementation
  req.user = { id: 'demo-user-id' };
  next();
};

