const assetModel = require("../models/assetModel");

async function getAllAssets(req, res) {
    try{
        const assets = await assetModel.getAllAssets();
        res.status(200).json({
            success: true,
            message: "Assets retrieved successfully",
            data: assets
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to retrieve assets",
            error: error.message
        });
    }
}


async function createAsset(req, res) {
    try {
        console.log("CREATE ASSET REQUEST");
        console.log(req.body);
        // 1. ambil data dari request
        const {
            asset_code,
            asset_name,
            category_id,
            brand_id,
            model,
            serial_number,
            status_id,
            location_id,
            employee_id,
            receive_date,
            note
        } = req.body;

        //cek asset_code sudah ada atau belum
        const exists = await assetModel.checkAssetCodeExists(asset_code);
        if (exists) {
            return res.status(400).json({
                success: false,
                message: `Asset code ${asset_code} sudah digunakan`
            });
        }

        //cek serial_number sudah ada atau belum
        const serialExists = await assetModel.checkSerialNumberExists(serial_number);
        if (serialExists) {
            return res.status(400).json({
                success: false,
                message: `Serial number ${serial_number} sudah digunakan`
            });
        }

        // 2. daftar field yang wajib diisi
        const requiredFields = [
            "asset_code",
            "asset_name",
            "category_id",
            "brand_id",
            "status_id",
            "location_id",
            "employee_id",
            "receive_date"
        ];

        // 3. cek apakah semua field wajib diisi
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({
                    success: false,
                    message: `Missing required field: ${field}`
                });
            }
        }

        const categoryExists = await assetModel.checkCategoryExists(category_id);
        if (!categoryExists) {
            return res.status(400).json({
                success: false,
                message: "Category tidak ditemukan"
            });
        }

        const brandExists = await assetModel.checkBrandExists(brand_id);
        if (!brandExists) {
            return res.status(400).json({
                success: false,
                message: "Brand tidak ditemukan"
            });
        }

        const statusExists = await assetModel.checkStatusExists(status_id);
        if (!statusExists) {
            return res.status(400).json({
                success: false,
                message: "Status tidak ditemukan"
            });
        }

        const locationExists = await assetModel.checkLocationExists(location_id);
        if (!locationExists) {
            return res.status(400).json({
                success: false,
                message: "Location tidak ditemukan"
            });
        }

        const employeeExists = await assetModel.checkEmployeeExists(employee_id);
        if (!employeeExists) {
            return res.status(400).json({
                success: false,
                message: "Employee tidak ditemukan"
            });
        }

        // 4. simpan data ke database
        const asset = await assetModel.createAsset({
            asset_code,
            asset_name,
            category_id,
            brand_id,
            model,
            serial_number,
            status_id,
            location_id,
            employee_id,
            receive_date,
            note
        });

        // 5. kirim response sukses
        res.status(201).json({
            success: true,
            message: "Asset created successfully",
            assetId: asset.insertId
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create asset",
            error: error.message
        });
    }
}

async function getAssetById(req, res) {
    const { id } = req.params;

    try {
        
        if (!asset) {
            return res.status(404).json({
                success: false,
                message: "Asset not found"
            });
        }

        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid asset ID"
            });
        }

        const asset = await assetModel.getAssetById(id);

        res.status(200).json({
            success: true,
            message: "Asset retrieved successfully",
            data: asset
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve asset",
            error: error.message
        });
    }

}

async function updateAsset(req, res) {
    const { id } = req.params;
    const assetData = req.body;

    try {
        // 1. ambil data dari request
        const {
            asset_code,
            asset_name,
            category_id,
            brand_id,
            model,
            serial_number,
            status_id,
            location_id,
            employee_id,
            receive_date,
            note
        } = req.body;
        
        // 2. daftar field yang wajib diisi
        const requiredFields = [
            "asset_code",
            "asset_name",
            "category_id",
            "brand_id",
            "status_id",
            "location_id",
            "employee_id",
            "receive_date"
        ];

        // 3. validation
        for (const field of requiredFields) {
            if (!assetData[field]) {
                return res.status(400).json({
                    success: false,
                    message: `Missing required field: ${field}`
                });
            }
        }

        //cek asset_code sudah ada atau belum
        const assetCodeExists = await assetModel.checkAssetCodeExistsForUpdate(asset_code, id);
        if (assetCodeExists) {
            return res.status(400).json({
                success: false,
                message: `Asset code ${asset_code} sudah digunakan oleh asset lain`
            });
        }

        //cek serial_number sudah ada atau belum
        if (serial_number) {
            const serialNumberExists = await assetModel.checkSerialNumberExistsForUpdate(serial_number, id);
            
            if (serialNumberExists) {
                return res.status(400).json({
                    success: false,
                    message: `Serial number ${serial_number} sudah digunakan oleh asset lain`
                });
            }
        }

        //cek category_id, brand_id, status_id, location_id, employee_id
        const categoryExists = await assetModel.checkCategoryExists(category_id);
        if (!categoryExists) {
            return res.status(400).json({
                success: false,
                message: "Category tidak ditemukan"
            });
        }

        const brandExists = await assetModel.checkBrandExists(brand_id);
        if (!brandExists) {
            return res.status(400).json({
                success: false,
                message: "Brand tidak ditemukan"
            });
        }

        const statusExists = await assetModel.checkStatusExists(status_id);
        if (!statusExists) {
            return res.status(400).json({
                success: false,
                message: "Status tidak ditemukan"
            });
        }

        const employeeExists = await assetModel.checkEmployeeExists(employee_id);
        if (!employeeExists) {
            return res.status(400).json({
                success: false,
                message: "Employee tidak ditemukan"
            });
        }

        const result = await assetModel.updateAsset(id, assetData);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Asset not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Asset updated successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update asset",
            error: error.message
        });
    }

}

async function deleteAsset(req, res) {
    const { id } = req.params;

    try {
        console.log("DELETE ASSET ID", id);
        const result = await assetModel.deleteAsset(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Asset not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Asset deleted successfully",
        });
    }
    catch (error) {
        console.error("DELETE ASSET ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete asset",
            error: error.message
        });
    }

}

module.exports = {
    getAllAssets,
    createAsset,
    getAssetById,
    updateAsset,
    deleteAsset
};