const express = require("express");
const mysql = require("mysql");
const app = express();

app.use(express.static("static"));

app.post(
  "/savePokemon",
  express.urlencoded({ extended: false }),
  (req, res) => {
    insertPokemonCard(req.body.name, req.body.hp);
    res.end();
  }
);

app.listen(3000, () => {
  console.log("Server started att http://localhost:3000");
});

require("dotenv").config();
function createMySqlConnection() {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
}

function insertPokemonCard(name, hp) {
  const con = createMySqlConnection();
  con.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("Connected to database!");

    // SQL-fråga med placeholders
    let sql = "INSERT INTO pokemonCards (name, hp) VALUES (?, ?);";
    // Placeholder data
    let data = [name, hp];

    con.query(sql, data, (err, result) => {
      if (err) {
        throw err;
      }
      console.log("Pokemon Card created");
      console.log(result);
      con.end();
    });
  });
}
