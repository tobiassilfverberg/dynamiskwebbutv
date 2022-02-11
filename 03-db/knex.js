require("dotenv").config();
const mysql = require("mysql");

const knex = require("knex");
const connection = knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});

/* connection
  .select()
  .table("pokemonCards")
  .then((result) => {
    console.log(result);
    result.forEach((r) => {
      console.log(`Pokemon med namnet ${r.name} har hp ${r.hp}`);
    });
  }); */

/* connection
  .select("name", "hp")
  .table("pokemonCards")
  .then((result) => {
    console.log(result);
  }); */

/* connection
  .select("name", "hp")
  .where({ id: 2 })
  .orWhere({ id: 4 })
  .table("pokemonCards")
  .then((result) => {
    console.log(result);
  }); */

connection
  .select("id", "name", "hp")
  .whereIn("id", [2, 4, 6])
  .table("pokemonCards")
  .then((result) => {
    console.log(result);
  });

// Fulhack för att slippa trycka ctrl-c hela tiden
const s = 1;
setTimeout(() => {
  process.exit(0);
}, s * 1000);
