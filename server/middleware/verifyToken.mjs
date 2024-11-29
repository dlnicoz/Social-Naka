import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  // Extract the token from the Authorization header (bearer token)
  const token = req.header('auth-token') || req.header('Authorization')?.split(' ')[1];

  // If there's no token, return "Access Denied"
  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  try {
    // Verify the token using JWT secret
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the verified user details to the request object
    req.user = verified;
    
    // Move on to the next middleware/route handler
    next();
  } catch (err) {
    // Handle invalid or expired token errors
    return res.status(401).json({ message: 'Access Denied: Invalid or expired token', error: err.message });
  }
};
