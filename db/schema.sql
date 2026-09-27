create table users(
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
first_name VARCHAR(100) NOT NULL,
last_name VARCHAR(100) NOT NULL,
username VARCHAR(255) UNIQUE NOT NULL,
password_hash VARCHAR(255) NOT NULL, 
is_member BOOLEAN NOT NULL DEFAULT FALSE,
is_admin BOOLEAN NOT NULL DEFAULT FALSE,
created_at TIMESTAMP NOT NULL DEFAULT NOW()
)


create table messages(
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
title VARCHAR(255) NOT NULL,
body TEXT NOT NULL,
user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
created_at  TIMESTAMP NOT NULL DEFAULT NOW()
)

CREATE INDEX idx_messages_user_id ON messages(user_id);

CREATE INDEX idx_messages_created_at ON messages(created_at DESC);


SELECT 
    m.id,
    m.title,
    m.body,
    m.created_at,
    u.id AS author_id,
    u.first_name,
    u.last_name,
    u.username
FROM messages m
JOIN users u ON u.id = m.user_id
ORDER BY m.created_at DESC;