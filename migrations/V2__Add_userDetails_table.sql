CREATE TABLE IF NOT EXISTS userDetails (
        user_id VARCHAR(100) PRIMARY KEY,
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
    CREATE INDEX IF NOT EXISTS idx_users_city ON userDetails(city);
    