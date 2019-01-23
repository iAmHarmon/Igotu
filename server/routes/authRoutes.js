const passport = require('passport');
require('../controllers/passportController');
require('dotenv').config();

module.exports = app => {
  // * REDIRECTS USER TO GOOGLE WITH APPID
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'] // SPECIFIES INFORMATION FROM GOOGLE
    }),
    (req, res) => {}
  );

  // * REDIRECT FROM GOOGLE BACK TO APP-SERVER WITH GOOGLE CODE. PASSPORT SENDS THIS CODE BACK TO GOOGLE
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/api/current_user');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout(); // FUNCTION ON PASSPORT
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.json(req.user);
  });
};
