const divisionModel = require("../models/divisionModel");

async function getAllDivisions(req, res) {
    try {
        const divisions = await divisionModel.getAllDivisions();
        res.status(200).json({
            success: true,
            message: "Divisions retrieved successfully",
            data: divisions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve divisions",
            error: error.message
        });
    }
}

module.exports = {
    getAllDivisions
};