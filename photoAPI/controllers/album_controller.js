/**
 * Album controller
 */

const debug = require("debug")("photoAPI:auth_controller");
const { matchedData, validationResult } = require("express-validator");
const models = require("../models");

// Show all albums for this user
const show = async (req, res) => {
  const user = await models.User.fetchById(req.user.user_id, {
    withRelated: ["albums"],
  });

  try {
    const albums = await new models.Album(user)
      .where("user_id", user.id)
      .fetchAll();

    res.send({
      status: "success",
      data: albums,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Couldn't get albums",
    });
  }
};

// Show one album with id
const get = async (req, res) => {
  try {
    const album = await new models.Album()
      .where("id", req.params.albumId)
      .fetch();

    if (album.get("user_id") !== req.user.user_id) {
      return res.status(401).send({
        status: "fail",
        message: "You are not authorized to show this album",
      });
    }

    return res.send({
      status: "success",
      data: album,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Exception thrown in database when finding album",
    });
  }
};

// Create album
const upload = async (req, res) => {
  // get validated user
  // const user = await models.User.fetchById(req.user.user_id, {
  //   withRelated: ["albums"],
  // });

  // check for any validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ status: "fail", data: errors.array() });
  }

  // get only the validated data from the request
  const validData = matchedData(req);
  validData.user_id = req.user.user_id;
  console.log(validData);

  try {
    const result = await new models.Album(validData).save();
    debug("Added album to user successfully: %O", result);

    res.send({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Exception thrown in database when adding an album to a user.",
    });
    throw error;
  }
};

// Update album
const update = async (req, res) => {};

// Upload photo to album
const uploadPhoto = async (req, res) => {};

// Upload multiple photos to album
const uploadManyPhotos = async (req, res) => {};

// Delete one photo from album
const destroyPhoto = async (req, res) => {};

// Delete entire album
const destroy = async (req, res) => {};

module.exports = {
  show,
  get,
  upload,
  update,
  uploadPhoto,
  uploadManyPhotos,
  destroyPhoto,
  destroy,
};
