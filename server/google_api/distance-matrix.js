const request = require('request');

const distanceMatrix = {};

distanceMatrix.getDistance = (req, res, next) => {
  // if (!req.query.origin) next();
  const origin = req.query.origin;
  console.log(req.query.origin);
  const itemsLocations = [];

  res.locals.items.map(item => {
    const { street, city, state, zip } = item;
    itemsLocations.push(`${street}+${city}+${state}+${zip}`);
  });
  const destLocations = itemsLocations.join('|');

  const uri = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destLocations}&key=AIzaSyB0itacv2frK4HqF8SnG0ZVxALxCcYVBPw&units=imperial`;
  // console.log('G.URI', uri);
  request(
    {
      method: 'GET',
      uri
    },
    (err, httpResp, body) => {
      if (err) console.log('G.API Error:', err);
      const parseBody = JSON.parse(body);
      for (let i = 0; i < parseBody.rows[0].elements.length; i += 1) {
        res.locals.items[i].distance = parseBody.rows[0].elements[i].distance.text;
        res.locals.items[i].eta = parseBody.rows[0].elements[i].duration.text;
      }
      // console.log('Items after dist:', res.locals.items);
      next();
    }
  );
};

module.exports = distanceMatrix;
