const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// Import routes and middleware from mindgauge-backend
// Note: You may need to adjust paths based on deployment structure
const authRoutes = require('../mindgauge-backend/routes/auth');
const rateLimiter = require('../mindgauge-backend/middlewares/rateLimiter');

app.use(rateLimiter);
app.use('/api/auth', authRoutes);

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(functions.config().mongodb.uri || process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

connectDB();

// Export Express app as Firebase Function
exports.api = functions.https.onRequest(app);
