import express from 'express';
import passport from 'passport';

const router = express.Router();

// Google OAuth login route
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }), 
  (req, res) => {
    res.redirect('http://localhost:5173/dashboard');
  }
);

// Logout route
router.get('/auth/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});


export default router;
