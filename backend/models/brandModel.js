
const db = require("../config/db");

async function getAllBrands() {
    const sql = `
        SELECT
            id,
            brand_name
        FROM brands
        ORDER BY brand_name ASC
    `;

    const [rows] = await db.query(sql);
    return rows;
}

async function createBrand(brandName) {
    const sql = `
        INSERT INTO brands (brand_name)
        VALUES (?)
    `;

    const [result] = await db.query(sql, [brandName]);
    return result;
}

async function updateBrand(id, brandName) {
    const sql = `
        UPDATE brands
        SET brand_name = ?
        WHERE id = ?
    `;

    const [result] = await db.query(sql, [brandName, id]);
    return result;
}

async function deleteBrand(id) {
    const sql = `
        DELETE FROM brands
        WHERE id = ?
    `;

    const [result] = await db.query(sql, [id]);
    return result;
}

module.exports = {
    getAllBrands,
    createBrand,
    updateBrand,
    deleteBrand
};
