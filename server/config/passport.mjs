import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.mjs';

// Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (user) {
      // Update profilePhoto if it changes
      if (user.profilePhoto !== profile.photos[0]?.value) {
        user.profilePhoto = profile.photos[0]?.value;
        await user.save();
      }
      return done(null, user);
    }

    const newUser = new User({
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      profilePhoto: profile.photos[0]?.value // Save profile photo
    });

    user = await newUser.save();
    done(null, user);
  } catch (err) {
    done(err, false);
  }
}));


passport.serializeUser((user, done) => {
  done(null, user.id);  // Store the user ID in the session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);  // Retrieve the user from the database
    done(null, user);  // Attach the user to req.user
  } catch (err) {
    done(err, false);
  }
});
