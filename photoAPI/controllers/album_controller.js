/**
 * Album controller
 */

const debug = require("debug")("photoAPI:auth_controller");
const { matchedData, validationResult } = require("express-validator");
const models = require("../models");

// Show all albums for this user
const show = (req, res) => {
  const album = await new models.Album({ user: req.user }).fetchAll();
  // {withRelated: "photos",}

  res.send({
    status: "success",
    data: {
      album, //user.related("photos"),
    },
  });
};

// Show one album with id
const get = (req, res) => {
  const album = await new models.Album({ id: req.params.photoId }).fetch();
  // {withRelated: ["users"],};

  res.send({
    status: "success",
    data: {
      album,
    },
  });
};

// Create album
const upload = (req, res) => {
  // check for any validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ status: "fail", data: errors.array() });
  }

  // get only the validated data from the request
  const validData = matchedData(req);

  // lazy-load album relationship
  await req.user.load("album");

  // get the users photos
  const albums = req.user.related("albums");

  const existing_album = albums.find((album) => album.id == validData.album_id);

  if (existing_album) {
    return res.send({
      status: "fail",
      data: "Album already exists on user.",
    });
  }

  try {
    const result = await req.user.albums().attach(validData.album_id);
    debug("Added album to user successfully: %O", result);

    res.send({
      status: "success",
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Exception thrown in database when adding an album to user.",
    });
    throw error;
  }
};

// Update album
const update = (req, res) => {};

// Upload photo to album
const uploadPhoto = (req, res) => {};

// Upload multiple photos to album
const uploadManyPhotos = (req, res) => {};

// Delete one photo from album
const destroyPhoto = (req, res) => {};

// Delete entire album
const destroy = (req, res) => {};

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
