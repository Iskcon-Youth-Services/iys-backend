const client = require('../config/db');

const createTables = async () => {
    try {
        // Create 'users' table
        const createUsersTableQuery = `
            CREATE TABLE IF NOT EXISTS userLogin (
                id SERIAL PRIMARY KEY,
                username VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        // Create 'SadhanaFormScore' table
        const createSadhanaFormScoreTableQuery = `
            CREATE TABLE IF NOT EXISTS SadhanaScore (
                id SERIAL PRIMARY KEY,
                date DATE NOT NULL,
                username VARCHAR(100) REFERENCES users(username) ON DELETE CASCADE,
                nidratobedscore INT,
                nidrawakeupscore INT,
                nidradaysleepscore INT,
                japascore INT,
                pathanscore FLOAT,
                sravanscore FLOAT,
                totalscore FLOAT,
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

    const create_userTable=`CREATE TABLE IF NOT EXISTS userDetails (
        user_id VARCHAR(60) PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        mobile VARCHAR(15) NOT NULL UNIQUE,
        date_of_birth DATE,
        address_line1 VARCHAR(255),
        address_line2 VARCHAR(255),
        city VARCHAR(100),
        state VARCHAR(100),
        postal_code VARCHAR(20),
        country VARCHAR(100),
        gender CHAR(1),
        profile_picture_url VARCHAR(255),
        bio TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    
    CREATE  INDEX IF NOT EXISTS idx_users_email ON userDetails(email);
    CREATE INDEX IF NOT EXISTS idx_users_mobile ON userDetails(mobile);
    CREATE INDEX IF NOT EXISTS idx_users_city ON userDetails(city);`
    
        

        // Execute the queries
        await client.query(createUsersTableQuery);
        await client.query(createSadhanaFormScoreTableQuery);
        await client.query(createuser_sessionQuery);
        await client.query(create_userTable);

        console.log('Tables created successfully!');
    } catch (error) {
        console.error('Error creating tables:', error.message);
        throw error;
    }
};

module.exports = {createTables};
