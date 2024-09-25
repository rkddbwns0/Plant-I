const mysql = require('mysql2');

const db = mysql.createConnection({});

db.connect();

module.exports = db;
