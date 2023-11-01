const { Client, ClientBase } = require("pg");
require('dotenv').config();

const client = new Client({
    user: "okoro",
    host: "localhost",
    database: "recipeapp",
    password: process.env.db_password,
    port: 5432,
});
client.connect().then(() => console.log("Connected to database..."));
module.exports = client ;