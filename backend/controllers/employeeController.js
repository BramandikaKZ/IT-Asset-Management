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
        console.log("GET EMPLOYEES ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve employees",
            error: error.message
        });
    }
}

async function createEmployee(req, res) {
    const employeeData = req.body;

    try {
        const {
            employee_code,
            fullname,
            division_id,
            position,
            status
        } = employeeData;

        const requiredFields = [
            "employee_code",
            "fullname",
            "division_id",
            "position",
            "status"
        ];

        for (const field of requiredFields) {
            if (!employeeData[field]) {
                return res.status(400).json({
                    success: false,
                    message: `MIssing require field: ${field}`
                });
            }
        }

        const result = await employeeModel.createEmployee(employeeData);

        return res.status(201).json({
            success: true,
            message: "Employee created successfully",
            data: {
                id: result.insertId
            }
        });
        
    } catch (error) {
        console.error("CREATE EMPLOYEE ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create employee",
            error: error.message
        });
    }
}

async function updateEmployee(req, res) {
    const { id } = req.params;
    const employeeData = req.body;

    try {
        const {
            employee_code,
            fullname,
            division_id,
            position,
            status
        } = employeeData;

        const requiredFields = [
            "employee_code",
            "fullname",
            "division_id",
            "position",
            "status"
        ]; 

        for (const field of requiredFields) {
            if (!employeeData[field]) {
                return res.status(400).json({
                    success: false,
                    message: `Missing required field: ${field}`
                });
            }
        }

        const result = await employeeModel.updateEmployee(id, employeeData);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Employee updated successfully"
        });
    } catch (error) {
        console.error("UPDATE EMPLOYEE ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update employee",
            error: error.message
        });
    }
}

async function deleteEmployee(req, res) {
    const { id } = req.params;

    try {
        const result = await employeeModel.deleteEmployee(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Employee deleted successfully"
        });
    } catch (error) {
        console.error("DELETE EMPLOYEE ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete employee",
            error: error.message
        });
    }
}

module.exports = {
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
};