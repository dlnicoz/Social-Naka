import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/Users.mjs';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;

// Register User
// @route POST /users/register
// @desc Register a new user
// @access Public
router.post('/register', async (req, res) => {
    const { username, email, password, avatar } = req.body;
  
    // Check for existing users
    if (await User.findOne({ email })) return res.status(400).send('Email already exists');
    if (await User.findOne({ username })) return res.status(400).send('Username already exists');
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        avatar: avatar || 'default', // Default to 'default' if avatar is not provided
      });
  
      const savedUser = await newUser.save();
  
      // Generate token
      const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.header('auth-token', token).send(token);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });
  

// Login User
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check for user by username or email
  const user = await User.findOne({ $or: [{ username }, { email: username }] });
  if (!user) return res.status(400).send('Username/Email not found');

  // Validate password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).send('Invalid password');

  // Generate token
  const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: '1h' });
  res.header('auth-token', token).send(token);
});

export default router;
