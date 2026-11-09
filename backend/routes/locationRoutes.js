
const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");

// GET: Menampilkan semua lokasi
router.get("/", locationController.getAllLocations);

// POST: Menambahkan lokasi
router.post("/", locationController.createLocation);

// PUT: Mengedit lokasi berdasarkan ID
router.put("/:id", locationController.updateLocation);

// DELETE: Menghapus lokasi berdasarkan ID
router.delete("/:id", locationController.deleteLocation);

module.exports = router;
