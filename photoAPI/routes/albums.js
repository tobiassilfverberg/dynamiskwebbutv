/**
 * Requests for albums
 */
const express = require("express");
const router = express.Router();
const albumController = require("../controllers/album_controller");

// GET all albums (view all)
router.get("/", albumController);

// GET specifik album with id (view one)
router.get("/:albumId", albumController);

// POST an album (create new)
router.post("/", albumController);

// PUT an album (update an album)
router.put("/:albumId", albumController);

// POST photo to an album (add photo)
router.post("/:albumId/photos", albumController);

// POST multiple photos to album (add many photos)
router.post("/:albumId/photos", albumController);

// DELETE photo from album
router.delete("/:albumId/photos/:photoId", albumController);

// DELETE an album
router.delete("/:albumId", albumController);

module.exports = router;
