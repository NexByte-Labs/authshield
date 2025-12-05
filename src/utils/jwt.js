const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET is required in .env');

function signAccessToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' });
}

function signRefreshToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d' });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { signAccessToken, signRefreshToken, verifyToken };
