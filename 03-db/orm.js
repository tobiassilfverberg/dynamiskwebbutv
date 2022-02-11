const pokemonCards = require("./pokemonCards");
const pokemonFriends = require("./pokemonFriends");

/* pokemonCards.fetchAll().then((collection) => {
  // console.log(collection);
  console.log(collection.toJSON());
}); */

/* pokemonCards.count().then((count) => {
  console.log("Vi har nu " + count + " pokemons!");
}); */

/* pokemonCards
  .where({ hp: 200 })
  .fetchAll()
  .then((collection) => {
    console.log(collection.toJSON());
  }); */

/* const attribut = {
  name: "Skrelp",
  hp: 50,
};

let Skrelp = new pokemonCards(attribut);
Skrelp.save().then((res) => {
  console.log(res);
}); */

// Lista alla pokemon-vänner
pokemonFriends.fetchAll().then((friends) => {
  console.log(friends.toJSON());
});

// Skapa nya pokemon-vänner
/* const attribut = {
  name: "Evil Hacker",
  email: "evil@hacker.com",
};

let friends = new pokemonFriends(attribut);
friends.save().then((res) => {
  console.log(res);
}); */

for (let i = 1; i < 11; i++) {
  const attribute = {
    name: "namn" + i,
    email: "email" + i + "@email.nu",
  };
  let friends = new pokemonFriends(attribute);
  friends.save().then((friend) => {
    console.log(
      `Friend with name ${attribute.name} and email ${attribute.email} is added`
    );
  });
}
