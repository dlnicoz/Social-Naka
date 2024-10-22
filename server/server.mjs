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
app.use(cors());
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
    maxAge: 60000 * 60  // 1-hour session expiration
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Routes
import authRoutes from './routes/auth.mjs';
app.use(authRoutes);

import socialCardRoutes from './routes/socialCard.mjs';
app.use('/api/socialcards', socialCardRoutes);  // This registers the social card routes with /api/socialcards

// Add a root route handler for "/"
app.get('/', (req, res) => {
  res.send('Welcome to the Social Card App!');
});

app.get('/auth/check', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
