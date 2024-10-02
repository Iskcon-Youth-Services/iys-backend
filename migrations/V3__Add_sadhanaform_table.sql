CREATE TABLE IF NOT EXISTS sadhanascore (
                id SERIAL PRIMARY KEY,
                date DATE NOT NULL,
                user_id VARCHAR(100) REFERENCES userDetails(user_id) ON DELETE CASCADE,
                nidratobedscore INT,
                nidrawakeupscore INT,
                nidradaysleepscore INT,
                japascore INT,
                pathanscore FLOAT,
                sravanscore FLOAT,
                totalscore FLOAT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );