CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    address TEXT NOT NULL,
    address_line_2 TEXT,
    city TEXT,
    region TEXT,
    zip_code TEXT,
    country TEXT,
    gender TEXT,
    account_number TEXT UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS feeds (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    likes_count INTEGER DEFAULT 0,
    FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS likes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    feed_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (feed_id) REFERENCES feeds(id)
);

CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    user_id INTEGER,
    feed_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (feed_id) REFERENCES feeds(id)
);

CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT,
    start_date TIMESTAMP,
    target_end_date TIMESTAMP,
    user_id INTEGER,
    status TEXT CHECK( status IN ('To Do', 'Doing', 'Done') ) DEFAULT 'To Do',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE likes
DROP CONSTRAINT likes_feed_id_fkey,
ADD CONSTRAINT likes_feed_id_fkey
FOREIGN KEY (feed_id) REFERENCES feeds(id) ON DELETE CASCADE;

ALTER TABLE comments
DROP CONSTRAINT comments_feed_id_fkey,
ADD CONSTRAINT comments_feed_id_fkey
FOREIGN KEY (feed_id) REFERENCES feeds(id) ON DELETE CASCADE;

ALTER TABLE tasks ALTER COLUMN start_date TYPE DATE USING start_date::date;
ALTER TABLE tasks ALTER COLUMN target_end_date TYPE DATE USING target_end_date::date;

BEGIN;

ALTER TABLE users
    ALTER COLUMN first_name TYPE VARCHAR(50),
    ALTER COLUMN last_name TYPE VARCHAR(50),
    ALTER COLUMN address TYPE VARCHAR(100),
    ALTER COLUMN address_line_2 TYPE VARCHAR(100),
    ALTER COLUMN city TYPE VARCHAR(100),
    ALTER COLUMN region TYPE VARCHAR(100),
    ALTER COLUMN zip_code TYPE VARCHAR(10),
    ALTER COLUMN country TYPE VARCHAR(100),
    ALTER COLUMN gender TYPE VARCHAR(10),
    ALTER COLUMN account_number TYPE VARCHAR(20),
    ALTER COLUMN email TYPE VARCHAR(254),
    ALTER COLUMN password TYPE VARCHAR(100);

ALTER TABLE feeds
    ALTER COLUMN title TYPE VARCHAR(100);

ALTER TABLE tasks
    ALTER COLUMN title TYPE VARCHAR(100),
    ALTER COLUMN status TYPE VARCHAR(10);

COMMIT;
