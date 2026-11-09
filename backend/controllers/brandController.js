
const brandModel = require("../models/brandModel");

// GET: Menampilkan semua brand
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

// POST: Menambahkan brand
async function createBrand(req, res) {
    try {
        const { brand_name } = req.body;

        if (!brand_name || !brand_name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Brand name is required"
            });
        }

        await brandModel.createBrand(brand_name.trim());

        res.status(201).json({
            success: true,
            message: "Brand created successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create brand",
            error: error.message
        });
    }
}

// PUT: Mengedit brand
async function updateBrand(req, res) {
    try {
        const { id } = req.params;
        const { brand_name } = req.body;

        if (!brand_name || !brand_name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Brand name is required"
            });
        }

        const result = await brandModel.updateBrand(id, brand_name.trim());

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Brand not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Brand updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update brand",
            error: error.message
        });
    }
}

// DELETE: Menghapus brand
async function deleteBrand(req, res) {
    try {
        const { id } = req.params;

        const result = await brandModel.deleteBrand(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Brand not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Brand deleted successfully"
        });

    } catch (error) {
        console.error("DELETE BRAND ERROR:", error);

        // Foreign key constraint
        if (error.code === "ER_ROW_IS_REFERENCED_2" || error.errno === 1451) {
            return res.status(409).json({
                success: false,
                message: "Cannot delete brand because it is currently used by an asset."
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to delete brand"
        });
    }
}

module.exports = {
    getAllBrands,
    createBrand,
    updateBrand,
    deleteBrand
};
