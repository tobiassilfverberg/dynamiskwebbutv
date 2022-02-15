const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("OK!");
});

router.use("/pokemoncards", require("./pokemoncards_route"));

router.use("/pokemonfriends", require("./pokemoncards_route"));

router.use("/pokemonbattles", require("./pokemoncards_route"));

module.exports = router;
