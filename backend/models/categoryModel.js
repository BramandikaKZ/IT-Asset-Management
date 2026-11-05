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

async function createCategory(categoryName) {
    const [result] = await db.query(
        `
            INSERT INTO categories (category_name)
            VALUES (?)
        `,
        [categoryName]
    );
    return result;
}

async function updateCategory(id, category_name){
    const [result] = await db.query(
        `
            UPDATE categories
            SET category_name = ?
            WHERE id = ?
        `,  
        [category_name, id]
    );
    return result;
}

async function deleteCategory(id) {
    const [result] = await db.query(
        `
            DELETE FROM categories
            WHERE id = ?
        `,
        [id]
    );
    return result;
}

module.exports = {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
};