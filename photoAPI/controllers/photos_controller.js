/**
 * Photos controller
 */

const debug = require("debug")("photoAPI:auth_controller");
const { matchedData, validationResult } = require("express-validator");
const models = require("../models");

// Show all books related to user
const show = async (req, res) => {
  const user = await new models.User({ user: req.user }).fetch({
    withRelated: "photos",
  });

  res.send({
    status: "success",
    data: {
      books: user.related("photos"),
    },
  });
};

// Show book with id
const get = async (req, res) => {
  const photo = await new models.Photo({ id: req.params.photoId }).fetch({
    withRelated: ["users"],
  });

  res.send({
    status: "success",
    data: {
      photo,
    },
  });
};

// Upload new photo
const upload = async (req, res) => {
  {
    // check for any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({ status: "fail", data: errors.array() });
    }

    // get only the validated data from the request
    const validData = matchedData(req);

    // lazy-load photo relationship
    await req.user.load("photos");

    // get the users photos
    const photos = req.user.related("photos");

    const existing_photo = photos.find(
      (photo) => photo.id == validData.photo_id
    );

    if (existing_photo) {
      return res.send({
        status: "fail",
        data: "Photo already exists on user.",
      });
    }

    try {
      const result = await req.user.photos().attach(validData.photo_id);
      debug("Added photo to user successfully: %O", result);

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
  photo.destroy();
};

module.exports = {
  show,
  get,
  upload,
  update,
  destroy,
};
