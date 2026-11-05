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

async function createCategory(req, res) {
    try {
        const { category_name } = req.body;

        if (!category_name || !category_name.trim()) {
            return res.status(400).json({
                message: "Category name is required"
            });
        }

        const result = await categoryModel.createCategory(
            category_name.trim()
        );

        res.status(201).json({
            message: "Category create successfully",
            data: {
                id: result.insertId,
                category_name: category_name.trim()
            }
        });
    } catch (error) {
        console.error("CREATE CATEGORY ERROR:", error);

        res.status(500).json({
            message: "Failed to create category",
            error: error.message
        });
    }
}

async function updateCategory(req, res) {
    try {
        const { id } = req.params;
        const { category_name } = req.body;

        if (!category_name || !category_name.trim()) {
            return res.status(400).json({
                message: "Category name is required"
            });
        }

        const result = await categoryModel.updateCategory(
            id,
            category_name.trim()
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Category not found"
            });
        }
        res.status(200).json({
            message: "Category updated successfully",
            data: {
                id: Number(id),
                category_name: category_name.trim()
            }
        });
    } catch (error) {
        console.error("UPDATE CATEGORY ERROR:", error);

        res.status(500).json({
            message: "Failed to update category",
            error: error.message
        });
    }
}

async function deleteCategory(req, res) {
    try {
        const { id } = req.params;
        const result = await categoryModel.deleteCategory(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });
    } catch (error) {
        console.error("DELETE CATEGORY ERROR:", error);



        //MySQL for foreign key constraint violation
        if (error.code === "ER_ROW_IS_REFERENCED_2") {
            return res.status(400).json({
                success: false,
                message: "Category is currently used by an asset and cannot be deleted"
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to delete category",
            error: error.message
        });
    }
}

module.exports = {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
};