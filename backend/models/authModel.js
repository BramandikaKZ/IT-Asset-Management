const db = require("../config/db");

async function getUserByUsername(username) {
    // Implementation for fetching user by username
    const [rows] = await db.query(`
        SELECT
            id,
            fullname,
            username,
            password,
            role
        FROM users
        WHERE username = ?
        `, 
        [username]
    ); 

    return rows.length > 0 ? rows[0] : null;
}

module.exports = {
    getUserByUsername
};