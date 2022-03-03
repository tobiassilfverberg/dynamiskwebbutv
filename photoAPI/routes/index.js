const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controller");
const userValidation = require("../validation/user");
const validateJwt = require("../middlewares/auth");

// POST a user (register new)
router.post("/register", userValidation.createUser, authController.register);

// Login a user
router.post("/login", authController.login);

// Get new access token for user
router.post("/refresh", authController.refresh);

// Make sure access token is checked for every other request
router.use(validateJwt.validateJwtToken);

// Resten av routes
router.use("/albums", require("./albums"));
router.use("/photos", require("./photos"));
router.use("/users", require("./users"));

module.exports = router;
