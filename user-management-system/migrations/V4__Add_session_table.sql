CREATE TABLE IF NOT EXISTS user_sessions (
            sid VARCHAR NOT NULL COLLATE "default",
            sess JSON NOT NULL,
            expire TIMESTAMPTZ NOT NULL,
            PRIMARY KEY (sid)
        );