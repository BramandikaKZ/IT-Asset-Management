const employeeModel = require("../models/employeeModel");

async function getAllEmployees(req, res) {
    try {
        const employees = await employeeModel.getAllEmployees();
        res.status(200).json({
            success: true,
            message: "Employees retrieved successfully",
            data: employees
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve employees",
            error: error.message
        });
    }
}

module.exports = {
    getAllEmployees
};