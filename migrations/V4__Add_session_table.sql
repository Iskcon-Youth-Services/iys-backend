CREATE TABLE IF NOT EXISTS user_sessions (
            sid VARCHAR NOT NULL COLLATE "default",
            sess JSON NOT NULL,
            expire TIMESTAMPTZ NOT NULL,
            PRIMARY KEY (sid)
        );


-- CREATE TABLE role (
--     user_id INT PRIMARY KEY,
--     role ENUM('devotee', 'center_admin', 'super_admin') NOT NULL DEFAULT 'devotee',
--     CONSTRAINT unique_super_admin CHECK (
--         role != 'super_admin' OR (SELECT COUNT(*) FROM role WHERE role = 'super_admin') < 1
--     )
-- );
