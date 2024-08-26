const client = require('../config/db');

const createTables = async () => {
    try {
        // Create 'users' table
        const createUsersTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        // Create 'SadhanaFormScore' table
        const createSadhanaFormScoreTableQuery = `
            CREATE TABLE IF NOT EXISTS SadhanaFormScore (
                id SERIAL PRIMARY KEY,
                date DATE NOT NULL,
                username VARCHAR(100) REFERENCES users(username) ON DELETE CASCADE,
                nidratobedscore INT,
                nidrawakeupscore INT,
                nidradaysleepscore INT,
                japascore INT,
                pathan TEXT,
                sravan TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        const createuser_sessionQuery = `
        CREATE TABLE IF NOT EXISTS user_sessions (
            sid VARCHAR NOT NULL COLLATE "default",
            sess JSON NOT NULL,
            expire TIMESTAMPTZ NOT NULL,
            PRIMARY KEY (sid)
        );
    `;

       
        

        // Execute the queries
        await client.query(createUsersTableQuery);
        await client.query(createSadhanaFormScoreTableQuery);
        await client.query(createuser_sessionQuery);

        console.log('Tables created successfully!');
    } catch (error) {
        console.error('Error creating tables:', error.message);
        throw error;
    }
};

module.exports = {createTables};
