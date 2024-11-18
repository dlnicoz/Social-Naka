import jwt from 'jsonwebtoken';

export default function (req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Add user details to request
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
}
