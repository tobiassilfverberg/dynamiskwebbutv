const bookshelf = require("./bookshelf");

const pokemonCards = bookshelf.Model.extend({
  tableName: "pokemonCards",
});

module.exports = pokemonCards;
