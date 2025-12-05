const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.routes');

const app = express();
app.use(bodyParser.json());

// Health check
app.get('/ping', (req, res) => res.json({ status: 'ok' }));

// Routes
app.use('/api/auth', authRoutes);

// Protected example routes
const authenticate = require('./middleware/authenticate');
const authorize = require('./middleware/authorize');

app.get('/api/profile', authenticate, (req, res) => {
  res.json({ user: req.user });
});

app.get('/api/admin', authenticate, authorize('admin'), (req, res) => {
  res.json({ message: 'Welcome, admin' });
});

module.exports = app;
