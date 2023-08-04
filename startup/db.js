// db.js
const mysql2 = require('mysql2');
require('dotenv').config();

const connection = mysql2.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: process.env.sql_port,
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to mysql2:", err);
        return;
    }
    console.log("Connected to mysql2");
});

module.exports = connection;
