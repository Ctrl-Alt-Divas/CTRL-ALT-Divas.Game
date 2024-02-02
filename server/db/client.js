const { Client } = require('pg');
require('dotenv').config({ path: './.env' });

const client = new Client(process.env.DB_URL);

module.exports = client;
