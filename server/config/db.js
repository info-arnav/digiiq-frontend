const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.NEON_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false // Required for Neon
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};