const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pg = require('pg');

// * OAUTH FLOW SETUP. PASSPORT.USE TELLS PASSPORT TO USE THE GOOGLE STRATEGY FOR OAUTH
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('profile: ', profile);
      console.log('refreshToken: ', refreshToken);
      console.log('accessToken: ', accessToken);

      // ADD USER INFORMATION TO SQL DATABASE
      const query = {
        text: 'SELECT FROM users WHERE google_id = VALUES($1) RETURNING *',
        values: [profile.id]
      };
      pool.query(query.text, query.values, (err, user) => {
        if (user.length === 0) {
          const query = {
            text: 'INSERT INTO users(google_id, user_name) VALUES($1, $2) RETURNING *',
            values: [profile.id, profile.displayName]
          };
          pool.query(query.text, query.values, (err, user) => {
            if (err) console.log(err);
            done(null, user);
          });
        }
        if (err) console.log(err);
        else done(null, user);
      });
    }
  )
);
