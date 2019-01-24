const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('../db/postgressConnect');

require('dotenv').config();

// console.log('llllllllll', pool);

// * SERIALIZE USER
passport.serializeUser((user, done) => {
  console.log('users~~~~~~~~~: ', user);

  let id = user.id;
  done(null, id);
});

// * DESERIALIZE USER
passport.deserializeUser((id, done) => {
  console.log('!!!!!!!!!!! ---- desrialized wi user ', id);

  const query = {
    text: 'SELECT * FROM users WHERE id = $1',
    values: [id]
  };
  pool.query(query.text, query.values, (err, users) => {
    if (err) console.error(err);
    done(null, users.rows[0]);
  });
});

// * OAUTH FLOW SETUP. PASSPORT.USE TELLS PASSPORT TO USE THE GOOGLE STRATEGY FOR OAUTH
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      // * ADD USER INFORMATION TO SQL DATABASE

      // * QUERY DB AND CHECK IF USER ALREADY EXISTS
      const query = {
        text: 'SELECT * FROM users WHERE google_oauth_id = $1',
        values: [profile.id]
      };

      pool.query(query.text, query.values, (err, users) => {
        // console.log('INSIDE THE INSERT STATEMENT');
        // console.log('+++++++++user: ', user);
        if (users.rows.length === 0) {
          // * IF USER DOESN'T EXIST, ADD USER
          const query = {
            text:
              'INSERT INTO users(google_oauth_id, user_name, user_email_address, picture_url) VALUES($1, $2, $3, $4) RETURNING *',
            values: [
              profile.id,
              profile.displayName,
              profile.emails[0].value,
              profile.photos[0].value
            ]
          };

          pool.query(query.text, query.values, (err, users) => {
            // console.log('~~~~~~~~~~~~~~BEFORE ERR');
            if (err) console.err(err);
            // console.log('I INSERTED', user);
            console.log('00000000000', users);
            done(null, users.rows[0]);
          });
        }
        if (err) {
          console.error(err);
        } else {
          console.log('else', users);
          done(null, users.rows[0]);
        }
      });
    }
  )
);
