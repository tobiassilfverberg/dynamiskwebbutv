/**
 * User Validation Rules
 */
const { body } = require("express-validator");
const models = require("../models");

const createUser = [
  body("email")
    .exists()
    .isString()
    .custom(async (value) => {
      const user = await new models.User({ email: value }).fetch({
        require: false,
      });
      if (user) {
        return Promise.reject("Email already registered.");
      }

      return Promise.resolve();
    }),
  body("password").exists().isString().isLength({ min: 6 }),
  body("first_name").exists().isString().isLength({ min: 3 }),
  body("last_name").exists().isString().isLength({ min: 3 }),
];

module.exports = {
  createUser,
};
