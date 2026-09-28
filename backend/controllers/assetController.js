const assetModel = require("../models/assetModel");
const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");

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
        
        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid asset ID"
            });
        }

        const asset = await assetModel.getAssetById(id);

        if (!asset) {
            return res.status(404).json({
                success: false,
                message: "Asset not found"
            });
        }


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

async function getPublicAssetById(req, res) {
    try {
        const { id } = req.params;

        const asset = await assetModel.getPublicAssetById(id);

        if (!asset) {
            return res.status(404).json({
                success: false,
                message: "Asset tidak ditemukan"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Asset berhasil ditemukan",
            data: asset
        });

    } catch (error) {
        console.error("GET PUBLIC ASSET ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Gagal mengambil data asset"
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

async function getTotalAssets(req, res) {
    try {
        const total = await assetModel.getTotalAssets();

        res.status(200).json({
            success: true,
            data: {
                total
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get total assets",
            error: error.message
        });
    }
}

async function getAssetsByStatus(req, res) {
    try {
        const data = await assetModel.getAssetsByStatus();

        return res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to get assets by status",
            error: error.message
        });
    }
}

async function getAssetsByCategory(req, res) {
    try {
        const data = await assetModel.getAssetsByCategory();

        return res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to get assets by category",
            error: error.message
        });
    }
}

async function exportAssetsToExcel(req, res) {
    try {
        const filters = {
            search: req.query.search || "",
            status: req.query.status || "",
            category: req.query.category || "",
            location: req.query.location || ""
        }
        const assets = await assetModel.getAssetsForExport(filters);

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Assets");

        worksheet.columns = [
            { header: "Asset Code", key: "asset_code", width: 15 },
            { header: "Asset Name", key: "asset_name", width: 25 },
            { header: "Category", key: "category_name", width: 20 },
            { header: "Brand", key: "brand_name", width: 20 },
            { header: "Model", key: "model", width: 20 },
            { header: "Serial Number", key: "serial_number", width: 25 },
            { header: "Status", key: "status_name", width: 15 },
            { header: "Location", key: "location_name", width: 20 },
            { header: "Employee Code", key: "employee_code", width: 18 },
            { header: "Employee Name", key: "fullname", width: 25 },
            { header: "Position", key: "position", width: 25 },
            { header: "Division", key: "division_name", width: 20 },
            { header: "Receive Date", key: "receive_date", width: 15 },
            { header: "Note", key: "note", width: 30 },
        ];

        assets.forEach((asset) => {
            worksheet.addRow(asset);
        });

        worksheet.getRow(1).font = {
            bold: true
        };

        worksheet.getRow(1).alignment = {
            vertical: "middle",
            horizontal: "center"
        };

        worksheet.views = [
            {
                state: "frozen",
                ySplit: 1
            }
        ];

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        res.setHeader(
            "Content-Disposition",
            'attachment; filename="asset-report.xlsx"'
        );

        await workbook.xlsx.write(res);

        res.end();
    }catch (error) {
        console.error("EXPORT ASSET ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Gagal export data asset"
        });
    }
}

async function exportAssetsToPDF(req,res) {
    try {
        const filters = {
            search: req.query.search || "",
            status: req.query.status || "",
            category: req.query.category || "",
            location: req.query.location || ""
        };

        const assets = await assetModel.getAssetsForExport(filters);

        const doc = new PDFDocument({
            margin: 40,
            size: "A4"
        });

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="asset-report.pdf"'
        );

        doc.pipe(res);

        doc.fontSize(18).text("IT Asset Report", {
            align: "center"
        });

        doc.moveDown();

        doc.fontSize(10).text(
            `Total Asset: ${assets.length}`
        );

        doc.moveDown();

        assets.forEach((asset, index) => {
            doc.fontSize(11).text(
                `${index+1}. ${asset.asset_code} - ${asset.asset_name}`
            );

            doc.fontSize(9).text(
                `Category: ${asset.category_name || "-"} | Brand: ${asset.brand_name || "-"}`
            );

            doc.text(
                `Model: ${asset.model || "-"} | Serial: ${asset.serial_number || "-"}`
            );

            doc.text(
                `Status: ${asset.status_name || "-"} | Location: ${asset.location_name || "-"}`
            );

            doc.text(
                `Employee: ${asset.fullname || "-"} | Division: ${asset.division_name || "-"}`
            );

            doc.text(
                `Receive Date: ${
                    asset.receive_date
                        ? new Date (asset.receive_date).toISOString().split("T")[0]
                        : "-"
                }`
            );

            doc.moveDown();

            if (doc.y > 750 && index < assets.length - 1) {
                doc.addPage();
            }
        });

        doc.end();
    } catch (error) {
        console.error("EXPORT ASSETS PDF ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Gagal export data asset ke PDF"
        });
    }
}

module.exports = {
    getAllAssets,
    createAsset,
    getAssetById,
    getPublicAssetById,
    updateAsset,
    deleteAsset,
    getTotalAssets,
    getAssetsByStatus,
    getAssetsByCategory,
    exportAssetsToExcel,
    exportAssetsToPDF
};