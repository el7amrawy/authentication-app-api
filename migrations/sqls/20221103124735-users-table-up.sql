/* Replace with your SQL commands */
CREATE TABLE users
(
    id SERIAL PRIMARY KEY, -- primary key column
    username VARCHAR(50) NOT NULL,
    name VARCHAR(100),
    phone VARCHAR(100),
    email VARCHAR,
    bio VARCHAR,
    PASSWORD VARCHAR NOT NULL
);