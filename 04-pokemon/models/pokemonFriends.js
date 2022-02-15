const bookshelf = require("./bookshelf");

const pokemonCards = bookshelf.Model.extend({
  tableName: "pokemonFriends",
});

module.exports = pokemonCards;
