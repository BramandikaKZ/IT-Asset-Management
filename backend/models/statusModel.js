const db = require("../config/db");

const sql = `
    SELECT
        id,
        status_name
    FROM statuses
    ORDER BY status_name ASC
`;

async function getAllStatuses() {
    const [rows] = await db.query(sql);
    return rows;
}  

module.exports = {
    getAllStatuses
};