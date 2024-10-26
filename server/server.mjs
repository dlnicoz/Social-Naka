import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';
import cors from 'cors';
import passport from 'passport';
import './config/passport.mjs';  // Passport configuration

dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Middleware
// Enable CORS for requests coming from frontend (localhost:5173)
app.use(cors({
  origin: 'http://localhost:5173',  // Allow requests from frontend
  credentials: true  // Allow cookies and session credentials
}));
app.use(express.json());

import MongoStore from 'connect-mongo';

// Express session middleware
app.use(session({
  secret: 'socialnakawillbecomeunicorn',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),  // Use MongoDB to store sessions
  cookie: {
    secure: false,  // Set to true if using HTTPS
    httpOnly: true,
    maxAge: 60000 * 60  // 1-hour session expiration
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


import authRoutes from './routes/auth.mjs';
app.use('/api', authRoutes);  // routes under /api


import socialCardRoutes from './routes/socialCard.mjs';
app.use('/api/socialcards', socialCardRoutes);  // This registers the social card routes with /api/socialcards

// Add a root route handler for "/"
app.get('/', (req, res) => {
  res.send('Welcome to the Social Card App!');
});

// Example route for /auth/check
app.get('/api/auth/check', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});


import rateLimit from 'express-rate-limit';

// Apply rate limiting to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
});

app.use(limiter);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
