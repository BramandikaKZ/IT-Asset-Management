const statusModel = require("../models/statusModel");

async function getAllStatuses(req, res) {
    try {
        const statuses = await statusModel.getAllStatuses();
        res.status(200).json({
            success: true,
            message: "Statuses retrieved successfully",
            data: statuses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve statuses",
            error: error.message
        });
    }
}

module.exports = {
    getAllStatuses
};