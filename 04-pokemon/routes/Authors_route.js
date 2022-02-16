const express = require("express");
const router = express.Router();
const Authors_controller = require("../controllers/Authors_controller");

router.get("/", Authors_controller.read);

router.get("/:id", Authors_controller.read);

router.post("/", Authors_controller.create);

router.put("/:id", Authors_controller.update);

router.delete("/:id", Authors_controller.destroy);

module.exports = router;
