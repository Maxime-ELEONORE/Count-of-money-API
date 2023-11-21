import { use } from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { findOrCreate } from './User'; // Remplacer par votre modèle d'utilisateur

use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    findOrCreate({ googleId: profile.id }, (err, user) => {
      return done(err, user);
    });
  }
));
