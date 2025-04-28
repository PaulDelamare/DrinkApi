
const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'appdb'
});

const db = connection.promise();

module.exports = { db };

