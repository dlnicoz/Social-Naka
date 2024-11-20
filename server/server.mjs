import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';
import cors from 'cors';
import MongoStore from 'connect-mongo';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';  // Import cookie-parser

dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Middleware
// Enable CORS for requests coming from frontend
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from frontend
  credentials: true, // Allow cookies and session credentials
}));

app.use(express.json());

// Cookie parser middleware to parse cookies in the request
app.use(cookieParser()); // This middleware will parse cookies from the incoming request

// Express session middleware
app.use(session({
  secret: 'socialnakawillbecomeunicorn',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }), // Use MongoDB to store sessions
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
    httpOnly: true, // Prevent access from JS (important for refresh tokens)
    maxAge: 60000 * 60, // 1-hour session expiration
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // 'None' for cross-site requests, 'Lax' for local development
  },
}));

// Rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});

app.use(limiter);

// Add a root route handler for "/"
app.get('/', (req, res) => {
  res.send('Welcome to the Social Card App!');
});

// Import Routes
import socialCardsRouter from './routes/socialCards.mjs'; // Social card routes
import usersRouter from './routes/users.mjs'; // User authentication routes

// Add API routes
app.use('/api/social-cards', socialCardsRouter); // Social card endpoints
app.use('/api/users', usersRouter); // User authentication endpoints

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
