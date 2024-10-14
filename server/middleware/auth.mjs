export const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();  // User is authenticated, proceed to the next middleware or route handler
  } else {
    res.status(401).json({ message: 'Unauthorized' });  // User not authenticated
  }
};
