import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/Users.mjs';
import dotenv from 'dotenv';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

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

    user.refreshToken = hash(refreshToken); // Store securely
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
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isValid = bcrypt.compareSync(refreshToken, user.refreshToken);
    if (!isValid) return res.status(403).json({ message: 'Invalid refresh token' });

    const newAccessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    res.status(200).json({ token: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
});


// Router for request password reset
router.post('/request-reset', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour

    // Save token to user document
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // Send email with reset link
    const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use Gmail or your preferred SMTP service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click the link below to reset your password:</p>
             <a href="${resetUrl}">Reset Password</a>
             <p>If you did not request this, please ignore this email.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Reset link sent to your email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error sending reset link', details: err.message });
  }
}); 

// Route for resetting password
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Find the user with the matching reset token and ensure it's still valid
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }, // Ensure token is not expired
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and clear the reset token
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error resetting password', details: err.message });
  }
});

router.get('/reset-password', (req, res) => {
  res.status(200).send('Password reset link is valid. Submit your new password.');
});

// Add missing GET route for password reset validation
router.get('/validate-reset-token', async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }, // Ensure the token has not expired
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    res.status(200).json({ message: 'Valid token' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error validating token', details: err.message });
  }
});

// get in touch route
router.post('/contact', async (req, res) => {
  const { email, name, phone } = req.body; // Extract name and phone from the request body

  try {
    // Use nodemailer to send an email to the admin
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER, // Admin email
        pass: process.env.EMAIL_PASS, // Admin email password
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // Admin email
      subject: 'Get in Touch Request',
      text: `A user has requested to get in touch.\n\nUser details:\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Contact request sent successfully' });
  } catch (error) {
    console.error('Error sending contact email:', error.message);
    res.status(500).json({ message: 'Error sending contact email' });
  }
});




export default router;
