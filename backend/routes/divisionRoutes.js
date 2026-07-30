const express = require("express");
const router = express.Router();
const divisionController = require("../controllers/divisionController");

router.get("/", divisionController.getAllDivisions);

module.exports = router;