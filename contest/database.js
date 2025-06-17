var mysql = require('mysql2');
var conn = mysql.createConnection({
  host: 'localhost',          // your host name
  user: 'root',               // your database username
  password: 'root',  // put your MySQL root password here
  database: 'aadhar'          // your database name
});

conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully!');
});

module.exports = conn;
