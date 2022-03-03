/**
 * Authentication Middleware
 */

const bcrypt = require("bcrypt");
const debug = require("debug")("books:auth");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

/**
 * Validate JWT Token
 */
const validateJwtToken = (req, res, next) => {
  // make sure authorization header exists, otherwise bail
  if (!req.headers.authorization) {
    debug("Autorization header missing");

    return res.status(401).send({
      status: "fail",
      data: "Authorization required",
    });
  }

  // split authorization header into "authSchema token"
  const [authSchema, token] = req.headers.authorization.split(" ");
  if (authSchema.toLowerCase() !== "bearer") {
    return res.status(401).send({
      status: "fail",
      data: "Authorization required",
    });
  }

  // verify token (and extract payload)
  try {
    req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    return res.status(401).send({
      status: "fail",
      data: "Authorization failed",
    });
  }

  // pass request along
  next();
};

module.exports = {
  validateJwtToken,
};
