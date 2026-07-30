const db = require("../config/db");

const sql = `
    SELECT
        id,
        location_name
    FROM locations
    ORDER BY location_name ASC
`;

async function getAllLocations() {
    const [rows] = await db.query(sql);
    return rows;
}

module.exports = {
    getAllLocations
};