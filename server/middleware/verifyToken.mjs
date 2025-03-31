import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  
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
    return res.status(401).json({ message: 'Access Denied: Invalid or expired token while verifying', error: err.message });
  }
};
