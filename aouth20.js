const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const nodemailer = require('nodemailer');

const router = express.Router();

// Configure Passport
passport.use(new GoogleStrategy({
    clientID: '853347678553-rmlo33lklui6050e525h0jldrk864jf9.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'https://developers.google.com/oauthplayground'
  },
  (accessToken, refreshToken, profile, done) => {
    // Handle authentication as mentioned before.
    // ...
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'jayeshargade07@gmail.com',
          pass: 'jayesh@2505'
        }
      });
  
      const mailOptions = {
        from: 'jayeshargade07@gmail.com',
        to: profile.emails[0].value,
        subject: 'Welcome!',
        text: 'Thank you for signing in with Google!'
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
  
      return done(null, profile);

  }
));

// Route to initiate Google OAuth 2.0 authentication
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Route to handle Google OAuth 2.0 callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect or respond as needed.
    res.redirect('/profile');
  }
);

module.exports = router;
