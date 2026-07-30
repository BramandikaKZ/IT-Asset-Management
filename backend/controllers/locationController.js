const locationModel = require("../models/locationModel");

async function getAllLocations(req, res) {
    try {
        const locations = await locationModel.getAllLocations();
        res.status(200).json({
            success: true,
            message: "Locations retrieved successfully",
            data: locations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve locations",
            error: error.message
        });
    }
}

module.exports = {
    getAllLocations
};