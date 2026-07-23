const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key';
const JWT_EXPIRES_IN = '7d';

const createToken = (payload, secret = JWT_SECRET) => {
  return jwt.sign(payload, secret, { expiresIn: JWT_EXPIRES_IN });
};

const verifyToken = (token, secret = JWT_SECRET) => {
  return jwt.verify(token, secret);
};

const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

const requiresAuth = (method) => {
  const upperMethod = (method || 'GET').toUpperCase();
  return !['GET', 'HEAD', 'OPTIONS'].includes(upperMethod);
};

module.exports = {
  createToken,
  verifyToken,
  hashPassword,
  comparePassword,
  requiresAuth,
};
