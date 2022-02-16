const express = require("express");
const router = express.Router();
const Users_controller = require("../controllers/Users_controller");

router.get("/", Users_controller.read);

router.get("/:id", Users_controller.read);

module.exports = router;
