const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/login
router.post('/login', authController.login);

// (Optional) register route for demo
router.post('/register', async (req, res) => {
  const bcrypt = require('bcrypt');
  const User = require('../models/user.model');
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email & password required' });

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ error: 'User already exists' });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash: hash, name });
  res.status(201).json({ id: user._id, email: user.email });
});

module.exports = router;
