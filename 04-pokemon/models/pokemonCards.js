const bookshelf = require("./bookshelf");
const pokemonBattles = require("./pokemonBattles");

const pokemonCards = bookshelf.Model.extend({
  tableName: "pokemonCards",
  wonBattles() {
    return this.hasMany(pokemonBattles, "winningPokemon");
  },
  lostBattles() {
    return this.hasMany(pokemonBattles, "losingPokemon");
  },
});

module.exports = pokemonCards;
