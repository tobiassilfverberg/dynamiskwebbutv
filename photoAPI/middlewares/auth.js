/**
 * Authentication Middleware
 */

const debug = require("debug")("books:auth");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

/**
 * Validate JWT Token
 */
const validateJwtToken = (req, res) => {
  // make sure authorization header exists, otherwise bail
  if (!req) {
    debug("Autorization header missing");

    return res.status(401).send({
      status: "fail",
      data: "Authorization required",
    });
  }

  // split authorization header into "authSchema token"
  const [authSchema, token] = req.split(" ");
  if (authSchema.toLowerCase() !== "bearer") {
    return res.status(401).send({
      status: "fail",
      data: "Authorization required",
    });
  }

  // verify token (and extract payload)
  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return user;
  } catch (error) {
    return res.status(401).send({
      status: "fail",
      data: error,
    });
  }
};

module.exports = {
  validateJwtToken,
};
