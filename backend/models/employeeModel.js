const db = require("../config/db");

const sql = `
    SELECT
        e.id,
        e.employee_code,
        e.fullname,
        e.division_id,
        d.division_name,
        e.position,
        e.status,
        e.created_at,
        e.update_at
    FROM employees e
    LEFT JOIN divisions d 
        ON e.division_id = d.id
    ORDER BY e.fullname ASC
`;

async function getAllEmployees() {
    const [rows] = await db.query(sql);
    return rows;
}

async function createEmployee(employeeData) {
    const { employee_code, 
            fullname, 
            division_id, 
            position, 
            status 
        } = employeeData;

    const sql = `
        INSERT INTO employees (
        employee_code, 
        fullname, 
        division_id, 
        position, 
        status
        )

        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
        employee_code,
        fullname,
        division_id,
        position,
        status
    ]

    const [result] = await db.query(sql, values);
    return result.insertId;
}

async function updateEmployee(id, employeeData) {
    const { 
            employee_code, 
            fullname,
            division_id,
            position,
            status
        } = employeeData;

    const sql = `
        UPDATE employees
        SET 
            employee_code = ?,
            fullname = ?,
            division_id = ?,
            position = ?,
            status = ?
        WHERE id = ?
    `;

    const values = [
        employee_code,
        fullname,
        division_id,
        position,
        status,
        id
    ];

    const [result] = await db.query(sql, values);
    return result;
}

async function deleteEmployee(id) {
    const sql = `
        DELETE FROM employees
        WHERE id = ?
    `;
    const [result] = await db.query(sql, [id]);
    return result;
}

module.exports = {
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
};