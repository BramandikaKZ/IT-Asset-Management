const categoryModel = require("../models/categoryModel");

async function getAllCategories(req, res) {
    try {
        const categories = await categoryModel.getAllCategories();
        res.status(200).json({
            success: true,
            message: "Categories retrieved successfully",
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve categories",
            error: error.message
        });
    }
}

module.exports = {
    getAllCategories
};