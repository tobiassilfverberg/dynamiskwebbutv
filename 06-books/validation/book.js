/**
 * Book Validation Rules
 */
const { body } = require("express-validator");

const createRules = [
  body("title").exists().isString().isLength({ min: 1 }),
  body("isbn").optional().isString().isLength({ min: 8 }),
  body("pages").exists().isInt().isLength({ min: 1 }),
  body("author_id").exists().isInt().isLength({ min: 1 }),
];

const updateRules = [
  body("title").optional().isString().isLength({ min: 1 }),
  body("isbn").optional().isString().isLength({ min: 8 }),
  body("pages").optional().isInt().isLength({ min: 1 }),
  body("author_id").optional().isInt().isLength({ min: 1 }),
];

module.exports = {
  createRules,
  updateRules,
};
