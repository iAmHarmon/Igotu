const pg = require('pg');
require('dotenv').config();

// * CONNECT TO DB
const pool = new pg.Pool({
  connectionString: process.env.POSTGRES_URI
});

module.exports = pool;
