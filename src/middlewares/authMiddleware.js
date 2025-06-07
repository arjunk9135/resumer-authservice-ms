const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    console.log('Decoded Token:', decoded);

    const user = await User.findById(decoded.id).select('-password -resetPasswordToken -resetPasswordExpires');
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('JWT Error:', error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

const authorizeRole = (roles) => (req, res, next) => {
  if (!req.user || !req.user.roles.some((role) => roles.includes(role))) {
    return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
  }
  next();
};

const authorizeAdmin = (req, res, next) => {
  if (!req.user || !req.user.roles.includes('ADMIN')) {
    return res.status(403).json({ message: 'Forbidden: Admin access required' });
  }
  next();
};

module.exports = { authenticate, authorizeRole, authorizeAdmin };