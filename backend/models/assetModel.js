const db = require("../config/db");

async function getAllAssets() {
    const [rows] = await db.query(`
        SELECT
            a.id,
            a.asset_code,
            a.asset_name,
            a.serial_number,
            a.model,
            c.category_name,
            s.status_name,
            l.location_name,
            f.fullname
        FROM assets a
        LEFT JOIN categories c ON a.category_id = c.id
        LEFT JOIN statuses s ON a.status_id = s.id
        LEFT JOIN locations l ON a.location_id = l.id
        LEFT JOIN employees f ON a.employee_id = f.id
        ORDER BY a.asset_code ASC
    `);

    return rows;
}

async function createAsset(assetData) {
    const {
        asset_code,
        asset_name,
        category_id,
        brand_id,
        model,
        serial_number,
        status_id,
        location_id,
        employee_id,
        receive_date,
        note
    } = assetData;

    const sql = `
        INSERT INTO assets (
            asset_code,
            asset_name,
            category_id,
            brand_id,
            model,
            serial_number,
            status_id,
            location_id,
            employee_id,
            receive_date,
            note
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        asset_code,
        asset_name,
        category_id,
        brand_id,
        model,
        serial_number,
        status_id,
        location_id,
        employee_id,
        receive_date,
        note
    ];

    const [result] = await db.query(sql, values);

    return result;
}

async function getAssetById(id) {

    const [rows] = await db.query(`
        SELECT
            a.id,
            a.asset_code,
            a.asset_name,
            a.serial_number,
            a.model,
            c.category_name,
            s.status_name,
            l.location_name,
            f.fullname
        FROM assets a
        LEFT JOIN categories c ON a.category_id = c.id
        LEFT JOIN statuses s ON a.status_id = s.id
        LEFT JOIN locations l ON a.location_id = l.id
        LEFT JOIN employees f ON a.employee_id = f.id
        WHERE a.id = ?
    `, [id]);

    return rows[0];
}

async function updateAsset(id, assetData) {
    const {
        asset_code,
        asset_name,
        category_id,
        brand_id,
        model,
        serial_number,
        status_id,
        location_id,
        employee_id,
        receive_date,
        note
    } = assetData;

    const sql = `
        UPDATE assets
        SET
            asset_code = ?,
            asset_name = ?,
            category_id = ?,
            brand_id = ?,
            model = ?,
            serial_number = ?,
            status_id = ?,
            location_id = ?,
            employee_id = ?,
            receive_date = ?,
            note = ?
        WHERE id = ?
    `;

    const values = [
        asset_code,
        asset_name,
        category_id,
        brand_id,
        model,
        serial_number,
        status_id,
        location_id,
        employee_id,
        receive_date,
        note,
        id
    ];

    const [result] = await db.query(sql, values);

    return result;
}

async function deleteAsset(id) {
    const [result] = await db.query(`
        DELETE FROM assets 
        WHERE id = ?
    `, [id]);

    return result;
}

module.exports = {
    getAllAssets,
    createAsset,
    getAssetById,
    updateAsset,
    deleteAsset
};
