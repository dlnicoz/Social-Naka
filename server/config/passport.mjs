import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.mjs';

// Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (user) {
      return done(null, user);
    }

    const newUser = new User({
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName
    });

    user = await newUser.save();
    done(null, user);
  } catch (err) {
    done(err, false);
  }
}));

// Updated deserializeUser using async/await
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);  // Use async/await instead of callbacks
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});
