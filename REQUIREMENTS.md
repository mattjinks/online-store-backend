# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- INDEX: '/products' [GET] 
    - (Retrieves a list of all products available in the storefront)

- INDEX: '/products/top-5' [GET]
    - (Retrieves the top 5 most popular products, based on sales volume or user ratings)

- INDEX: '/products/category/:categoryName' [GET]
    - (Retrieves a list of products filtered by a specific category).

- SHOW: '/products/:id' [GET] 
    - (Retrieves the details of a single product, indentified by its ID)

- CREATE [ token required ]: '/products' [POST] 
    - (Adds a new product to the storefront. Requires an authentication token to ensure only authorized users can create products) 

#### Users
- Index [ token required ]: '/users' [GET]
    - (Retrieves a list of all users. Access requires auth token to ensure only authorized users can retrieve users)

- Show [ token required ]: '/users/:id' [GET]
    - (Retrieves the details of a single user, identified by its ID. Access requires auth token to ensure only authorized users can retrieve user details)

- Create [ token required ]: '/users' [POST]
    - (Adds a new user to the storefront.)

#### Orders
- SHOW [ token required ]: '/users/:userId/orders/current' [GET] 
    - Current Order by user (args: user id)

- INDEX [ token required ]: '/users/:userID/orders/completed' [GET]
    - Completed Orders by user (args: user id)

## Data Shapes
#### Product
-  id 
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## DATA TABLES
#### TABLE Products:
- id: SERIAL PRIMARY KEY
- name: VARCHAR()
- price: DECIMAL(10,2)
- category: VARCHAR()

#### TABLE Users
- id: SERIAL PRIMARY KEY
- firstName: VARCHAR()
- lastName: VARCHAR()
- password: VARCHAR()

#### TABLE Orders
- id: SERIAL PRIMARY KEY
- user_id [ foreign key ]: INTEGER REFERENCES Users(id)
- status: VARCHAR(50)

#### TABLE Orders_Items
- id: SERIAL PRIMARY KEY
- order_id [ foreign key ]: INTEGER REFERENCES Orders(id)
- product_id [ foreign key ]: INTEGER REFERENCES Products(id)
- quantity: INTEGER

