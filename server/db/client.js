const { Client } = require("pg");
const client = new Client("https://localhost:54321/cad");

module.exports = client;
