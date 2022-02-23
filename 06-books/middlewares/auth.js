/**
 * Authentication Middleware
 */

const debug = require("debug")("books:auth");
const { User } = require("../models");

/**
 * HTTP Basic Authentication
 */
const basic = async (req, res, next) => {
  // make sure authorization header exists, otherwise bail
  if (!req.headers.authorization) {
    debug("Autorization header missing");

    return res.status(401).send({
      status: "fail",
      data: "Authorization required",
    });
  }

  debug("Authorization header: %o", req.headers.authorization);
  const [authSchema, base64Payload] = req.headers.authorization.split(" ");

  // if authSchema isn't "basic", then bail
  if (authSchema.toLowerCase() !== "basic") {
    debug("Authorization schema isn't basic");

    return res.status(401).send({
      status: "fail",
      data: "Authorization required",
    });
  }

  // Decode payload from base64 -> ascii
  const decodedPayload = Buffer.from(base64Payload, "base64").toString("ascii");

  // Split decoded payload inte "<usernam>:<password>"
  const [username, password] = decodedPayload.split(":");

  // Check if a user with this username and password exists
  const user = await new User({ username, password }).fetch({ require: false });
  if (!user) {
    return res.status(401).send({
      status: "fail",
      data: "Authorization failed",
    });
  }

  // Finally, atach user to request
  req.user = user;

  // pass request along
  next();
};

module.exports = {
  basic,
};
