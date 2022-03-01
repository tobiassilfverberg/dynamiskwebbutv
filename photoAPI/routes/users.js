/**
 * Requests for photos
 */
 const express = require("express");
 const router = express.Router();
 const usersController = require("../controllers/users_controller");

 // POST a user (register new)
 router.post("/register", usersController); 

 // Login a user
 router.post("/login", usersController); 

 // Get new access token for user
 router.post("/refresh", usersController); 

 module.exports = router; 