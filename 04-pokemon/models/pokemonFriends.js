const bookshelf = require("./bookshelf");
const PokemonCards = require("./pokemonCards");

const PokemonFriends = bookshelf.Model.extend({
  tableName: "pokemonFriends",
  cards() {
    return this.belongsToMany(
      PokemonCards,
      "PokemonFriendCards",
      "friend",
      "card"
    );
  },
});

/*
const PokemonFriends = bookshelf.model('PokemonFriends', {
    tableName: "PokemonFriends"
});
*/

module.exports = PokemonFriends;
