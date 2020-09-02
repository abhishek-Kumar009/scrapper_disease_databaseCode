const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'disease_db',
    multipleStatements: true
});

mysqlConnection.connect(error => {
    if (!error) {
        console.log('Connected to the database!');
    } else {
        console.error('Failed to connect to the database!');
    }
});

module.exports = mysqlConnection;