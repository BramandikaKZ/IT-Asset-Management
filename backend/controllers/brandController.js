const brandModel = require("../models/brandModel");

async function getAllBrands(req, res) {
    try {
        const brands = await brandModel.getAllBrands();
        res.status(200).json({
            success: true,
            message: "Brands retrieved successfully",
            data: brands
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve brands",
            error: error.message
        });
    }
}

module.exports = {
    getAllBrands
};
