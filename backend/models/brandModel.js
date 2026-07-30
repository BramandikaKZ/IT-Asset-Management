const db = require("../config/db");

const sql = `
    SELECT
        id,
        brand_name
    FROM brands
    ORDER BY brand_name ASC
`;

async function getAllBrands() {
    const [rows] = await db.query(sql);
    return rows;
}

module.exports = {
    getAllBrands
};
