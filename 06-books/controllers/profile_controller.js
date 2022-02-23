/**
 * Profile Controller
 */

const debug = require("debug")("books:profile_controller");
const { matchedData, validationResult } = require("express-validator");
const models = require("../models");

/**
 * Get authenticated users profile
 *
 * GET /
 */
const getProfile = async (req, res) => {
  res.send({
    status: "success",
    data: {
      user: req.user,
    },
  });
};

/**
 * Update an authenticated users profile
 *
 * PUT /
 */
const updateProfile = async (req, res) => {
  res.status(405).send({
    status: "error",
    message: "This is a workshop",
  });
};

/**
 * Get authenticated users books
 *
 * GET /books
 */
const getBooks = async (req, res) => {
  // lazy load books
  // wait req.user.load(['books'])

  const user = await new models.User({ id: req.user.id }).fetch({
    withRelated: "books",
  });

  res.send({
    status: "success",
    data: {
      user,
    },
  });
};

module.exports = {
  getProfile,
  updateProfile,
  getBooks,
};
