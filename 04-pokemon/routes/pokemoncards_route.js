const express = require("express");
const router = express.Router();
const pokemoncards_controller = require("../controllers/pokemoncards_controller");
const pokemonCards = require("../models/pokemonCards");

router.get("/", pokemoncards_controller.read);

router.get("/:id", pokemoncards_controller.read);

router.post("/", pokemoncards_controller.create);

router.put("/:id", pokemoncards_controller.update);

router.delete("/:id", pokemoncards_controller.remove);

module.exports = router;
