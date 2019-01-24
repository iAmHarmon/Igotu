const passport = require('passport');
// require('dotenv').config();

module.exports = app => {
  // * REDIRECTS USER TO GOOGLE WITH APPID
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'] // SPECIFIES INFORMATION FROM GOOGLE
    })
  );

  // * REDIRECT FROM GOOGLE BACK TO APP-SERVER WITH GOOGLE CODE. PASSPORT SENDS THIS CODE BACK TO GOOGLE
  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/failed' }),
    (req, res) => {
      console.log('IM HERE', req.session.passport.user);
      console.log('HELLO', req.cookies);
      res.json(req.user);
      //   res.redirect('/');
      // res.sendStatus(200);
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout(); // FUNCTION ON PASSPORT
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    if (!req.user) res.json('');
    res.json(req.user);
  });
};
