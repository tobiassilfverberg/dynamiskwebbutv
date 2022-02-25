/**
 * Profile Validation Rules
 */
const { body } = require("express-validator");
const models = require("../models");

// Allow everything but password to be updated
const updateRules = [
  body("password").optional().isLength({ min: 6 }),
  body("first_name").optional().isString().isLength({ min: 2 }),
  body("last_name").optional().isString().isLength({ min: 2 }),
];

const addBookRules = [body("book_id").exists().isInt({ min: 1 })];

module.exports = {
  updateRules,
  addBookRules,
};
