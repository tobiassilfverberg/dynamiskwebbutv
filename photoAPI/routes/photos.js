/**
 * Requests for photos
 */
const express = require("express");
const router = express.Router();
const photosController = require("../controllers/photos_controller");

// GET all photos (show all)
router.get("/", photosController);

// GET single photo (show one)
router.get("/:photoId", photosController);

// POST a new photo (create new photo)
router.post("/", photosController);

// PUT a photo (update a photo)
router.put("/:photoId", photosController);

// DELETE a photo
router.delete("/:photoId", photosController);

module.exports = router;
