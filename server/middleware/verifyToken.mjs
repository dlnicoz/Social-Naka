import jwt from 'jsonwebtoken';
import User from '../models/Users.mjs';

// Middleware to check if the access token is valid
export default async function (req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    // Verify the token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;  // Attach the user details to the request object

    // Check if access token expired and refresh if needed
    const currentTime = Math.floor(Date.now() / 1000);  // Get current time in seconds

    if (verified.exp < currentTime) {
      // Access token expired, refresh it using the refresh token
      return res.status(401).json({ message: 'Access token expired, please refresh your token' });
    }

    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
}
