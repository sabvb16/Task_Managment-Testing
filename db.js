var mysql = require("mysql2");

var connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "SABVBTS1623.s",
  database: "nodeOperations",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connection;
