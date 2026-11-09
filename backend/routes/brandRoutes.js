
const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brandController");

// GET: Menampilkan semua brand
router.get("/", brandController.getAllBrands);

// POST: Menambahkan brand
router.post("/", brandController.createBrand);

// PUT: Mengedit brand berdasarkan ID
router.put("/:id", brandController.updateBrand);

// DELETE: Menghapus brand berdasarkan ID
router.delete("/:id", brandController.deleteBrand);

module.exports = router;
