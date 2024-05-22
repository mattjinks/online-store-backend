CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    password VARCHAR(255)
);

-- INSERT INTO users (firstname, lastname, password) VALUES ('Matthew', 'Jinks', 'password');