/**
 * authenticate middleware
 * Verifies JWT token from Authorization header and attaches `req.user`.
 * Returns 401 with a helpful message when auth fails.
 */
const { verifyToken } = require('../utils/jwt');

module.exports = function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Authorization header missing' });

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Malformed Authorization header' });
  }

  const token = parts[1];
  try {
    const payload = verifyToken(token);
    // Attach minimal user info to req.user
    req.user = { id: payload.id, role: payload.role, email: payload.email };
    return next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
