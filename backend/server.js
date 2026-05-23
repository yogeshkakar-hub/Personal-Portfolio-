const express = require('express');
const cors = require('cors');

const path = require('path');
require('dotenv').config();

const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static frontend files from the root directory
app.use(express.static(path.join(__dirname, '../')));

// API Routes
app.use('/api', apiRoutes);

// 404 handler specifically for API routes
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'API Route not found' });
});

// Catch-all route to serve index.html for any unknown non-API routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.use((err, req, res, next) => {
  console.log('Unhandled error caught by express:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message, stack: err.stack });
});

const startServer = () => {

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
    server.close(() => process.exit(1));
  });

  process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
    server.close(() => process.exit(1));
  });
};

startServer();