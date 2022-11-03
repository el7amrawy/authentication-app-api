/* Replace with your SQL commands */
CREATE TABLE users
(
    id SERIAL PRIMARY KEY, -- primary key column
    username VARCHAR(50),
    name VARCHAR(100),
    phone VARCHAR(100),
    email VARCHAR NOT NULL,
    bio VARCHAR,
    PASSWORD VARCHAR NOT NULL
);