/**
 * Photos controller
 */

const debug = require("debug")("photoAPI:photos_controller");
const { matchedData, validationResult } = require("express-validator");
const models = require("../models");
const validateJwt = require("../middlewares/auth");

// Show all photos related to user
const show = async (req, res) => {
  // validate user
  const validatedUser = validateJwt.validateJwtToken(req.headers.authorization);
  const user = await models.User.fetchById(validatedUser.user_id);

  try {
    const photos = await new models.Photo(user)
      .where("user_id", user.id)
      .fetchAll();

    res.send({
      status: "success",
      data: {
        photos, // varför printar den data{photos{[]}} ?
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Couldn't get photos",
    });
  }
};

// Show book with id
const get = async (req, res) => {
  // validate user
  const validatedUser = validateJwt.validateJwtToken(req.headers.authorization);
  const user = await models.User.fetchById(validatedUser.user_id);

  try {
    const photo = await new models.Photo.getPhoto()
      .where("id", req.params)
      .fetch();

    return res.send({
      status: "success",
      data: {
        photo,
      },
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Exception thrown in database when finding photo",
    });
  }
};

// Upload new photo
const upload = async (req, res) => {
  // get validated user
  // const user = validateJwt.validateJwtToken(req.headers.authorization);

  // check for any validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ status: "fail", data: errors.array() });
  }

  // get only the validated data from the request
  const validData = matchedData(req);

  try {
    const result = await new models.Photo(validData).save();
    debug("Added photo to user successfully: %O", result);

    res.send({
      status: "success",
      data: {
        result, // varför printar den data {result{}} och user_id = null?
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Exception thrown in database when adding a photo to a user.",
    });
    throw error;
  }
};

// Update photo
const update = async (req, res) => {
  const photoId = req.params.photoId;

  // make sure photo exists
  const photo = await new models.Photo({ id: photoId }).fetch({
    require: false,
  });
  if (!photo) {
    debug("Photo to update was not found. %o", { id: photoId });
    res.status(404).send({
      status: "fail",
      data: "Photo Not Found",
    });
    return;
  }

  // check for any validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ status: "fail", data: errors.array() });
  }

  // get only the validated data from the request
  const validData = matchedData(req);

  try {
    const updatedPhoto = await photo.save(validData);
    debug("Updated photo successfully: %O", updatedPhoto);

    res.send({
      status: "success",
      data: {
        photo,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Exception thrown in database when updating a photo.",
    });
    throw error;
  }
};

// Delete photo with id
const destroy = async (req, res) => {
  const photoId = req.params.photoId;

  // make sure photo exists
  const photo = await new models.Photo({ id: photoId }).fetch({
    require: false,
  });
  if (!photo) {
    debug("Photo to delete was not found. %o", { id: photoId });
    res.status(404).send({
      status: "fail",
      data: "Photo Not Found",
    });
    return;
  }

  // delete photo
  delete photo;
};

module.exports = {
  show,
  get,
  upload,
  update,
  destroy,
};
