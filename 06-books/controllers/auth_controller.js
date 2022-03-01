/**
 * Auth Controller
 */

const bcrypt = require("bcrypt");
const debug = require("debug")("books:auth_controller");
const { matchedData, validationResult } = require("express-validator");
const models = require("../models");
const jwt = require("jsonwebtoken");

/**
 * Login a user, sign a JWT token and return it
 *
 * POST /login
 * {
 *  "username": "",
 *  "password": ""
 * }
 */
const login = async (req, res) => {
  // login in the user
  const user = await models.User.login(req.body.username, req.body.password);
  if (!user) {
    return res.status(401).send({
      status: "fail",
      data: "Authentication failed",
    });
  }

  // construct jwt payload
  const payload = {
    sub: user.get("username"),
    user_id: user.get("id"),
    name: user.get("first_name") + " " + user.get("last_name"),
  };

  // sign payload and get access token
  const access_token = jwt.sign(payload, "secretkey");

  // respond with the access-token
  return res.send({
    status: "success",
    data: {
      // access-token here
      access_token,
    },
  });
};

/**
 * Register a new user
 *
 * POST /regiser
 */
const register = async (req, res) => {
  // check for any validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ status: "fail", data: errors.array() });
  }

  // get only the validated data from the request
  const validData = matchedData(req);

  console.log("The validated data:", validData);

  // generate a hash of `validData.password`
  // and overwrite `validData.password` with the generated hash
  try {
    validData.password = await bcrypt.hash(
      validData.password,
      models.User.hashSaltRounds
    );
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Exception thrown in database when hashing the password.",
    });
    throw error;
  }

  try {
    const user = await new models.User(validData).save();
    debug("Created new user successfully: %O", user);

    res.send({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Exception thrown in database when creating a new user.",
    });
    throw error;
  }
};

module.exports = {
  register,
  login,
};
