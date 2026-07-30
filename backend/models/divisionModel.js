const db = require("../config/db");

const sql = `
    SELECT
        id,
        division_name
    FROM divisions
    ORDER BY division_name ASC
`;

async function getAllDivisions() {
    const [rows] = await db.query(sql);
    return rows;
}

module.exports = {
    getAllDivisions
};