const db = require("../config/db");

async function getAllAssets() {
    const [rows] = await db.query(`
        SELECT
            a.id,
            a.asset_code,
            a.asset_name,

            a.category_id,
            a.brand_id,
            a.status_id,
            a.location_id,
            a.employee_id,

            a.model,
            a.serial_number,
            a.receive_date,
            a.note,

            c.category_name,
            b.brand_name,
            s.status_name,
            l.location_name,

            e.employee_code,
            e.fullname,

            d.division_name

        FROM assets a
        LEFT JOIN categories c ON a.category_id = c.id
        LEFT JOIN brands b ON a.brand_id = b.id
        LEFT JOIN statuses s ON a.status_id = s.id
        LEFT JOIN locations l ON a.location_id = l.id
        LEFT JOIN employees e ON a.employee_id = e.id
        LEFT JOIN divisions d ON e.division_id = d.id
        
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

async function checkAssetCodeExists(assetCode) {
    const sql = `
        SELECT id
        FROM assets
        WHERE asset_code = ?
        LIMIT 1
    `;
    const [rows] = await db.query(sql, [assetCode]);

    return rows.length > 0;
}

async function checkSerialNumberExists(serialNumber) {
    const sql = `
        SELECT id
        FROM assets
        WHERE serial_number = ?
        LIMIT 1
    `;
    const [rows] = await db.query(sql, [serialNumber]);

    return rows.length > 0;
}

async function checkAssetCodeExistsForUpdate(assetCode, id) {
    const sql = `
        SELECT id
        FROM assets
        WHERE asset_code = ?
        AND id != ?
        LIMIT 1
    `;
    const [rows] = await db.query(sql, [assetCode, id]);

    return rows.length > 0;
}

async function checkSerialNumberExistsForUpdate(serialNumber, id) {
    const sql = `
        SELECT id
        FROM assets
        WHERE serial_number = ?
        AND id != ?
        LIMIT 1
    `;
    const [rows] = await db.query(sql, [serialNumber, id]);

    return rows.length > 0;
}

async function checkCategoryExists(categoryId) {
    const sql = `
        SELECT id
        FROM categories
        WHERE id = ?
        LIMIT 1
    `;
    const [rows] = await db.query(sql, [categoryId]);

    return rows.length > 0;
}

async function checkBrandExists(branId) {
    const sql = `
        SELECT id
        FROM brands
        WHERE id = ?
        LIMIT 1
    `;
    const [rows] = await db.query(sql, [branId]);

    return rows.length > 0;
}

async function checkStatusExists(statusId) {
    const sql = `
        SELECT id
        FROM statuses
        WHERE id = ?
        LIMIT 1
    `;
    const [rows] = await db.query(sql, [statusId]);

    return rows.length > 0;
}

async function checkLocationExists(locationId) {
    const sql = `
        SELECT id
        FROM locations
        WHERE id = ?
        LIMIT 1
    `;
    const [rows] = await db.query(sql, [locationId]);

    return rows.length > 0;
}

async function checkEmployeeExists(employeeId) {
    const sql = `
        SELECT id
        FROM employees
        WHERE id = ?
        LIMIT 1
    `;
    const [rows] = await db.query(sql, [employeeId]);
    
    return rows.length > 0;
}

module.exports = {
    getAllAssets,
    createAsset,
    getAssetById,
    updateAsset,
    deleteAsset,
    checkAssetCodeExists,
    checkSerialNumberExists,
    checkAssetCodeExistsForUpdate,
    checkSerialNumberExistsForUpdate,
    checkCategoryExists,
    checkBrandExists,
    checkStatusExists,
    checkLocationExists,
    checkEmployeeExists
};
