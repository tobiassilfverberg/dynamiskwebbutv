const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile_controller");
// const profileValidationRules = require("../validation/profile");

/* Get profile for authenticated user - GET */
router.get("/", profileController.getProfile);

/* Update authenticated user's profile - PUT */
router.get("/", /* @todo Validation */ profileController.updateProfile);

/* Get all books for authenticated user - GET /books */
router.get("/books", /* @todo Validation */ profileController.getBooks);

module.exports = router;
