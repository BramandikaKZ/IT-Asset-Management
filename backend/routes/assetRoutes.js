const express = require("express");

const router = express.Router();
const assetController = require("../controllers/assetController");
const verifyToken = require("../middleware/verifyToken");
const authorizeRoles = require("../middleware/authorizeRoles");
const ROLES = {
    ADMIN: "Admin",
    STAFF: "Staff"
}

// Apply token verification and authorization middleware to all asset routes
router.use(verifyToken);

router.get("/", authorizeRoles(ROLES.ADMIN, ROLES.STAFF), assetController.getAllAssets);
router.post("/", authorizeRoles(ROLES.ADMIN, ROLES.STAFF), assetController.createAsset);
router.get("/:id", authorizeRoles(ROLES.ADMIN, ROLES.STAFF), assetController.getAssetById);
router.put("/:id", authorizeRoles(ROLES.ADMIN, ROLES.STAFF), assetController.updateAsset);
router.delete("/:id", authorizeRoles(ROLES.ADMIN), assetController.deleteAsset);
router.get("/stats/total", authorizeRoles(ROLES.ADMIN, ROLES.STAFF), assetController.getTotalAssets);
router.get("/stats/status", authorizeRoles(ROLES.ADMIN, ROLES.STAFF), assetController.getAssetsByStatus);
router.get("/stats/category", authorizeRoles(ROLES.ADMIN, ROLES.STAFF), assetController.getAssetsByCategory);

module.exports = router;