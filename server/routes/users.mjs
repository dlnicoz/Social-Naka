import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/Users.mjs';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET; // Refresh token secret

// Hash function for secure storage of refresh tokens
const hash = (token) => bcrypt.hashSync(token, 10);

// Register User
router.post('/register', async (req, res) => {
  const { username, email, password, avatar } = req.body;

  try {
    if (await User.findOne({ email })) return res.status(400).send('Email already exists');
    if (await User.findOne({ username })) return res.status(400).send('Username already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      avatar: avatar || 'default',
    });

    const savedUser = await newUser.save();

    const accessToken = jwt.sign({ _id: savedUser._id }, jwtSecret, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ _id: savedUser._id }, refreshTokenSecret, { expiresIn: '7d' });

    savedUser.refreshToken = hash(refreshToken); // Hash and store the refresh token
    await savedUser.save();

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ accessToken, username: savedUser.username });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Login User
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [
        { username: { $regex: `^${username}$`, $options: 'i' } },
        { email: { $regex: `^${username}$`, $options: 'i' } },
      ],
    });

    if (!user) return res.status(400).send('Username/Email not found');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).send('Invalid password');

    const accessToken = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ _id: user._id }, refreshTokenSecret, { expiresIn: '7d' });

    user.refreshToken = hash(refreshToken);
    await user.save();

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken, username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Refresh Access Token
router.post('/refresh-token', async (req, res) => {
  const { refreshToken } = req.cookies; // Get refresh token from cookies

  if (!refreshToken) return res.status(400).json({ message: 'No refresh token provided' });

  try {
    const decoded = jwt.verify(refreshToken, refreshTokenSecret);
    const user = await User.findById(decoded._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isValid = bcrypt.compareSync(refreshToken, user.refreshToken);
    if (!isValid) return res.status(403).json({ message: 'Invalid refresh token' });

    const newAccessToken = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: '15m' });
    res.status(200).json({ token: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
});

export default router;
