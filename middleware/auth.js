// middleware/auth.js
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    req.user = await User.findById(decoded._id).select('-password'); // Optionally exclude password
    if (!req.user) {
      throw new Error('User not found');
    }
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

export default auth;
