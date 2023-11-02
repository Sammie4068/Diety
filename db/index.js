const { Client, ClientBase } = require("pg");
require('dotenv').config();

const client = new Client({
    user: "hp",
    host: "localhost",
    database: "recipeapp",
    password: "1975",
    port: 5432,
});
client.connect().then(() => console.log("Connected to database..."));
module.exports = client ;