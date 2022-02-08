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

  con.query("SELECT id, name, hp FROM pokemonCards", (err, result) => {
    if (err) throw err;

    console.log("Data från databasen:");
    result.forEach((r) => {
      console.log(`Pokemon har namnet ${r.name} med hp ${r.hp}`);
    });
    con.end();
  });
});
