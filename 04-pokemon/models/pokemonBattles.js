const bookshelf = require("./bookshelf");

const pokemonBattles = bookshelf.Model.extend({
  tableName: "pokemonBattles",
});

module.exports = pokemonBattles;
