/**
 * authorize(requiredRole)
 * Middleware factory that checks if authenticated user has the required role.
 */
module.exports = function authorize(requiredRole) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
    // Allow admins to access everything
    if (req.user.role === 'admin') return next();
    // Support single role or array of allowed roles
    if (Array.isArray(requiredRole)) {
      if (requiredRole.includes(req.user.role)) return next();
    } else if (req.user.role === requiredRole) {
      return next();
    }
    return res.status(403).json({ error: 'Insufficient permissions' });
  };
};
