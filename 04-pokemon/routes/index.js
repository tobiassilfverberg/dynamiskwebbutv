const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("OK!");
});

router.use("/users", require("./Users_route"));

router.use("/pokemoncards", require("./pokemoncards_route"));

router.use("/pokemonfriends", require("./pokemonfriends_route"));

router.use("/pokemonbattles", require("./pokemonbattles_route"));

module.exports = router;
