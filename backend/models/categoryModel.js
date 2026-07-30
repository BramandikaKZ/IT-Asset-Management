const db = require("../config/db");

const sql = `
    SELECT
        id,
        category_name
    FROM categories
    ORDER BY category_name ASC
`;

async function getAllCategories() {
    const [rows] = await db.query(sql);
    return rows;
}

module.exports = {
    getAllCategories
};