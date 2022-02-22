/**
 * User Validation Rules
 */
const { body } = require("express-validator");

const createRules = [
  body("username").exists().isLength({ min: 3 }),
  body("password").exists().isLength({ min: 6 }),
  body("first_name").exists().isString().isLength({ min: 2 }),
  body("last_name").exists().isString().isLength({ min: 2 }),
];

const updateRules = [];

module.exports = {
  createRules,
  updateRules,
};
