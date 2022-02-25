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
  // check for any validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ status: "fail", data: errors.array() });
  }

  // get only the validated data from the request
  const validData = matchedData(req);

  try {
    const updatedUser = await req.user.save(validData);
    debug("Updated user successfully: %O", updatedUser);

    res.send({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Exception thrown in database when updating a new user.",
    });
    throw error;
  }
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

/**
 * Add a book to the authenticated user
 *
 * @todo 1. Validate that the book actually exists
 * @todo 2. Validate that the book they are trying to add isn't already in the list
 *
 * POST /books
 * {
 *   book_id: 5
 * }
 */
const addBook = async (req, res) => {
  // check for any validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ status: "fail", data: errors.array() });
  }

  // get only the validated data from the request
  const validData = matchedData(req);

  try {
    const result = await req.user.books().attach(validData.book_id);
    // ta bort specifik bok
    //const result = await req.user.books().detach(validData.book_id);
    // ta bort alla böcker
    // const result = await req.user.books().detach();
    debug("Added book to user successfully: %O", result);

    res.send({
      status: "success",
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Exception thrown in database when adding a book to a user.",
    });
    throw error;
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getBooks,
  addBook,
};
