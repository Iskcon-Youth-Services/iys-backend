const pool = require('../config/db');

// Create table if not exists
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS googleUserDetails (
        id SERIAL PRIMARY KEY,
        googleId VARCHAR(255) UNIQUE NOT NULL,
        displayName VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        photo VARCHAR(255)
    );
`;

pool.query(createTableQuery)
    .then(() => console.log('Google User Table is ready'))
    .catch(err => console.error('Error creating table', err));

const upsertUser = async (googleId, displayName, email, photo) => {
    const query = `
        INSERT INTO googleUserDetails (googleId, displayName, email, photo)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (googleId) DO UPDATE
        SET displayName = EXCLUDED.displayName,
            email = EXCLUDED.email,
            photo = EXCLUDED.photo
        RETURNING *;
    `;
    const values = [googleId, displayName, email, photo];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];  // Return the full user object
    } catch (err) {
        console.error('Error inserting/updating user', err);
        throw err;
    }
};

const findUserByGoogleId = async (googleId) => {
    const query = `SELECT * FROM googleUserDetails WHERE googleId = $1;`;
    const values = [googleId];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];  // Return the full user object
    } catch (err) {
        console.error('Error finding user', err);
        throw err;
    }
};

module.exports = {
    upsertUser,
    findUserByGoogleId
};
