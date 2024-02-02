const { Client } = require('pg');
require('dotenv').config({ path: './.env' });

// const client = new Client(process.env.DB_URL);
const client = new Client('postgres://localhost:54321/cad');

module.exports = client;
