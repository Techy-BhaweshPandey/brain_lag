const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// Import routes and middleware from mindgauge-backend
// DEPLOYMENT NOTE: Before deploying to Firebase Functions, you need to either:
// 1. Copy the mindgauge-backend routes and middlewares into the functions directory, OR
// 2. Restructure to make these imports available in the functions deployment package
// The relative path below assumes deployment structure includes parent directories
const authRoutes = require('../mindgauge-backend/routes/auth');
const rateLimiter = require('../mindgauge-backend/middlewares/rateLimiter');

app.use(rateLimiter);
app.use('/api/auth', authRoutes);

// MongoDB connection with proper connection pooling for Firebase Functions
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }
  
  try {
    await mongoose.connect(
      functions.config().mongodb?.uri || process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    isConnected = true;
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

// Export Express app as Firebase Function with connection handling
exports.api = functions.https.onRequest(async (req, res) => {
  await connectDB();
  return app(req, res);
});
