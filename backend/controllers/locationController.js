
const locationModel = require("../models/locationModel");

// GET: Menampilkan semua lokasi
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

// POST: Menambahkan lokasi
async function createLocation(req, res) {
    try {
        const { location_name } = req.body;

        if (!location_name || !location_name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Location name is required"
            });
        }

        await locationModel.createLocation(location_name.trim());

        res.status(201).json({
            success: true,
            message: "Location created successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create location",
            error: error.message
        });
    }
}

// PUT: Mengedit lokasi
async function updateLocation(req, res) {
    try {
        const { id } = req.params;
        const { location_name } = req.body;

        if (!location_name || !location_name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Location name is required"
            });
        }

        const result = await locationModel.updateLocation(
            id,
            location_name.trim()
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Location not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Location updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update location",
            error: error.message
        });
    }
}


// DELETE: Menghapus lokasi
async function deleteLocation(req, res) {
    try {
        const { id } = req.params;

        const result = await locationModel.deleteLocation(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Location not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Location deleted successfully"
        });

    } catch (error) {
        console.error("DELETE LOCATION ERROR:", error);

        // Foreign key constraint
        if (error.code === "ER_ROW_IS_REFERENCED_2" || error.errno === 1451) {
            return res.status(409).json({
                success: false,
                message: "Cannot delete location because it is currently used by an asset."
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to delete location"
        });
    }
}


module.exports = {
    getAllLocations,
    createLocation,
    updateLocation,
    deleteLocation
};
