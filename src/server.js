require('dotenv').config();
const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 4000;
connectDB().then(() => {
  const server = http.createServer(app);
  server.listen(PORT, () => {
    // Friendly startup log
    console.log(`AuthShield running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to DB:', err.message);
  process.exit(1);
});
