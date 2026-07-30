const db = require("../config/db");

const sql = `
    SELECT
        e.id,
        e.employee_code,
        e.fullname,
        d.division_name,
        e.position,
        e.status
    FROM employees e
    LEFT JOIN divisions d 
        ON e.division_id = d.id
    ORDER BY e.fullname ASC
`;

async function getAllEmployees() {
    const [rows] = await db.query(sql);
    return rows;
}

module.exports = {
    getAllEmployees
};