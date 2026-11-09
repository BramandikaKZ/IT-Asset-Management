
const db = require("../config/db");

async function getAllLocations() {
    const sql = `
        SELECT
            id,
            location_name
        FROM locations
        ORDER BY location_name ASC
    `;

    const [rows] = await db.query(sql);
    return rows;
}

async function createLocation(locationName) {
    const sql = `
        INSERT INTO locations (location_name)
        VALUES (?)
    `;

    const [result] = await db.query(sql, [locationName]);
    return result;
}

async function updateLocation(id, locationName) {
    const sql = `
        UPDATE locations
        SET location_name = ?
        WHERE id = ?
    `;

    const [result] = await db.query(sql, [locationName, id]);
    return result;
}

async function deleteLocation(id) {
    const sql = `
        DELETE FROM locations
        WHERE id = ?
    `;

    const [result] = await db.query(sql, [id]);
    return result;
}

module.exports = {
    getAllLocations,
    createLocation,
    updateLocation,
    deleteLocation
};
