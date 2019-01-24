const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');

const request = require('request');
// const userController = require('./controllers/users-controller');
const itemsController = require('./controllers/items-controller');
const distanceMatrix = require('./google_api/distance-matrix');
require('dotenv').config();

console.log('ENVAR:', process.env);

require('./controllers/passportController');

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-TypeError, Accept');
  next();
});

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

app.get('/user/:email', (req, res) => {
  // joins user table and item table
  res.status(200);
});

app.get('/item/:id', itemsController.getOneItem, (req, res) => {
  res.status(200).json(res.locals.oneItem);
});

app.get(
  '/search/:item_name',
  itemsController.searchItem,
  distanceMatrix.getDistance,
  (req, res) => {
    res.status(200).json(res.locals.items);
  }
);

app.get(
  '/category/:category',
  itemsController.searchCategory,
  distanceMatrix.getDistance,
  (req, res) => {
    res.status(200).json(res.locals.items);
  }
);

app.get('/allItems', itemsController.getAllItems, distanceMatrix.getDistance, (req, res) => {
  console.log(res.locals.items);
  res.status(200).json(res.locals.items);
});

// app.post('/addUser', userController.addUser, (req, res) => {
//   res.status(200).json(res.locals.data);
// });

app.post('/addItem', itemsController.addItem, (req, res) => {
  console.log('this is the req.body in addItem', req.body);
  res.status(200).json(res.locals.data);
});

app.get('/checkupcite', (req, res) => {
  if (req.query.val.length === 12 && !isNaN(Number(req.query.val))) {
    request(
      `https://api.upcitemdb.com/prod/trial/lookup?upc=${req.query.val}`,
      (error, response, body) => {
        res.json(body);
      }
    );
  } else {
    request(
      `https://api.upcitemdb.com/prod/trial/search?s=${req.query.val}`,
      (error, response, body) => {
        res.json(body);
      }
    );
  }
});

app.delete('/deleteItem', itemsController.deleteItem, (req, res) => {
  // deletes item from database
  res.status(200);
});

app.use(express.static(path.resolve(__dirname, '../build')));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
