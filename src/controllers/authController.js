const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { signAccessToken, signRefreshToken } = require('../utils/jwt');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });

  const payload = { id: user._id.toString(), role: user.role, email: user.email };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  // Note: For production, store refresh token in a secure store or set as HttpOnly cookie
  return res.json({ accessToken, refreshToken });
};
