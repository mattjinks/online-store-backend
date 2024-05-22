CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    status VARCHAR(50)
);

-- INSERT INTO users (firstname, lastname, password) VALUES 
-- ('Matthew', 'Jinks', 'password');