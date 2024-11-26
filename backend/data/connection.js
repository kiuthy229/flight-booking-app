const { Client } = require("pg");

//Use host: "postgres" when running with Docker
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "123456789",
  port: 5432,
});

client.connect();

module.exports = client;
