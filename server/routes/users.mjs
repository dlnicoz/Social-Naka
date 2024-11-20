import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/Users.mjs';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET; // Get refresh token secret from .env

// Hash function for secure storage of refresh tokens
const hash = (token) => {
  return bcrypt.hashSync(token, 10); // Return hashed token for storage
};

// Register User
// @route POST /users/register
// @desc Register a new user
// @access Public
router.post('/register', async (req, res) => {
  const { username, email, password, avatar } = req.body;

  try {
    // Check for existing users
    if (await User.findOne({ email })) return res.status(400).send('Email already exists');
    if (await User.findOne({ username })) return res.status(400).send('Username already exists');

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      avatar: avatar || 'default', // Default avatar if not provided
    });

    const savedUser = await newUser.save();

    // Generate token (access token) and refresh token
    const accessToken = jwt.sign({ _id: savedUser._id }, jwtSecret, { expiresIn: '15m' });  // Short-lived access token
    const refreshToken = jwt.sign({ _id: savedUser._id }, refreshTokenSecret, { expiresIn: '7d' });  // Long-lived refresh token

    // Hash the refresh token and save it to the database
    savedUser.refreshToken = hash(refreshToken);  // Store the hashed refresh token
    await savedUser.save();

    // Send the tokens to the client (access token in response, refresh token in httpOnly cookie)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,  // Only accessible via HTTP, not by JavaScript
      secure: process.env.NODE_ENV === 'production',  // Only send cookie over HTTPS in production
      sameSite: 'Strict',  // Restrict cookie to same site
      maxAge: 7 * 24 * 60 * 60 * 1000,  // 1 week expiration for refresh token
    });

    res.status(201).json({ accessToken, username: savedUser.username });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Login User
// @route POST /users/login
// @desc Authenticate a user
// @access Public
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check for user by username or email (case-insensitive)
    const user = await User.findOne({
      $or: [
        { username: { $regex: `^${username}$`, $options: 'i' } }, // Case-insensitive match for username
        { email: { $regex: `^${username}$`, $options: 'i' } }, // Case-insensitive match for email
      ],
    });

    if (!user) return res.status(400).send('Username/Email not found');

    // Validate password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).send('Invalid password');

    // Generate token (access token) and refresh token
    const accessToken = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: '15m' });  // Short-lived access token
    const refreshToken = jwt.sign({ _id: user._id }, refreshTokenSecret, { expiresIn: '7d' });  // Long-lived refresh token

    // Hash the refresh token and update it in the database
    user.refreshToken = hash(refreshToken);  // Hash and store the refresh token
    await user.save();

    // Send the tokens to the client (access token in response, refresh token in httpOnly cookie)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,  // Only accessible via HTTP, not by JavaScript
      secure: process.env.NODE_ENV === 'production',  // Only send cookie over HTTPS in production
      sameSite: 'Strict',  // Restrict cookie to same site
      maxAge: 7 * 24 * 60 * 60 * 1000,  // 1 week expiration for refresh token
    });

    res.status(200).json({ accessToken, username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Refresh Access Token
// @route POST /users/refresh-token
// @desc Refresh access token using refresh token
// @access Private (only works if the user has a valid refresh token)
router.post('/refresh-token', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;  // Extract the refresh token from the cookie

  if (!refreshToken) {
    return res.status(401).send('Refresh token not found');
  }

  try {
    // Verify the refresh token
    const verified = jwt.verify(refreshToken, refreshTokenSecret);

    // Find user by the ID from the refresh token
    const user = await User.findById(verified._id);
    if (!user || user.refreshToken !== hash(refreshToken)) {
      return res.status(403).send('Invalid refresh token');
    }

    // Generate a new access token
    const newAccessToken = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: '15m' });

    // Send the new access token back to the frontend
    res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    console.error(err);
    res.status(403).send('Invalid or expired refresh token');
  }
});

export default router;
