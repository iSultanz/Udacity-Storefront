# API Requirements


## Endpoints
- User
    - signUp (POST /user/signUp) body {email,firstName,lastName,password} to create user
    - signIn (POST /user/signIn) body {email,password} to generate token for user
    - getUsers (GET /user) Require token
    - getUserById (GET /user/:id) take user id as param Require token

- Product 
    - createProduct (POST /product/create) body {name, price, category} to create product (Require token)
    - getProducts (GET /product)
    - getProductById (GET /product/:id) take product id as param

- Order
    - createOrder (POST /order/create) body required { quantity, productId } OPTIONAL {userId} else will take it from token (Require token)
    - getUserOrder (GET /order/user) Get the current user Order OPTIONAL body status = {ACTIVE, COMPLETE} (Require token)
    - getAllOrder (GET /order) Get all orders OPTIONAL body status = {ACTIVE, COMPLETE}
    - updateOrderStatus (PATCH /order/update/:id) take product id as param (Require token)


## Data shape
- user
    - id
    - Email
    - firstName
    - lastName
    - password

```
    +----------------------------------+
	|  Column   |        type          | 
	|-----------+----------------------|
	| id        |BIGSERIAL PRIMARY KEY |
	| email     |VARCHAR(200)          |
	| password  |VARCHAR(200)          |
	| firstname |VARCHAR(200)          |
	| lastname  |VARCHAR(200)          |
	| salt      |VARCHAR(255)          |
	+----------------------------------+
```

- product
    - id
    - name
    - price
    - category

```
    +----------------------------------+
	|  Column   |        type          | 
	|-----------+----------------------|
	| id        |BIGSERIAL PRIMARY KEY |
	| name      |VARCHAR(125)          |
	| price     |NUMERIC NOT NULL      |
	| category  |VARCHAR(235)          |
	+----------------------------------+
```

- order
    - id
    - user_id (Foreign key User(id))
    - status (ACTIVE, COMPLETE)

```
    +--------------------------------------------+
	|  Column   |        type          		     | 
	|-----------+--------------------------------|
	| id        |BIGSERIAL PRIMARY KEY   	 	 |
	| user_id   |INTEGER   FOREIGN KEY 		     |
	| status    |status NOT NULL DEFAULT 'ACTIVE'|
	+--------------------------------------------+
```

- order-product
    - id
    - quantity
    - product_id (Foreign key Product(id))
    - order_id (Foreign key Order(id))

```
    +----------------------------------------+
	|  Column    |      type          	     | 
	|------------+---------------------------|
	| id         |BIGSERIAL PRIMARY KEY      |
	| quantity   |INTEGER   FOREIGN KEY 	 |
	| product_id |INTEGER   FOREIGN KEY 	 |
	| order_id   |INTEGER   FOREIGN KEY      |
	+----------------------------------------+
```
