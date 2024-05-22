CREATE TABLE orders_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES Orders(id),
    product_id INTEGER REFERENCES Products(id),
    quantity INTEGER
);

-- INSERT INTO users (firstname, lastname, password) VALUES 
-- ('Matthew', 'Jinks', 'password');