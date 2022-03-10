/**
 * Album Rules
 */
 const { body } = require("express-validator");

 const uploadRules = [
   body("title").exists().isString().isLength({ min: 3 }),
 ];
 
 const updateRules = [
   body("title").exists().isString().isLength({ min: 3 }),
 ];
 
 module.exports = { uploadRules, updateRules };