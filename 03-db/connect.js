const mysql = require("mysql");

let con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "root",
  database: "Pokemon",
});

con.connect((err) => {
  if (err) throw err;

  console.log("Anslutit till databasen!");
});
