require("dotenv").config();
const mysql = require("mysql");

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

con.connect((err) => {
  if (err) throw err;

  console.log("Anslutit till databasen!");

  con.query("SELECT id, name, hp FROM pokemonCards", (err, result) => {
    if (err) throw err;

    console.log("Data från databasen:");
    result.forEach((r) => {
      console.log(`Pokemon har namnet ${r.name} med hp ${r.hp}`);
    });
    con.end();
  });
});

// console.log(process.env);
