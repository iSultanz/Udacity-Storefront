# Storefront Backend Project

## Getting Started

This repo contains storefront backend application use ```yarn``` instead of ```npm```

##  Technologies Stack
The Following technologies stack was used in this project:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- bcrypt from npm for encrypting passwords and store them safely
- morgan middleware from npm as logger for http request logging
- jasmine from npm for testing

## Setup the Database
Create the database for both dev and test to start the application
-  Connect to the base route in postgres ```psql -U postgres```
-  Create a user if with the credential ```CREATE USER postgres WITH PASSWORD postgres;```
-  Create Databases for dev ```CREATE DATABASE "full-stack-javascript";```
- Create Database for test   ```CREATE DATABASE "full-stack-javascript_test";```

## Environment Variables

    PORT=3001
    NODE_ENV=dev
    POSTGRES_USER= postgres
    POSTGRES_PASSWORD= postgres
    POSTGRES_HOST= localhost
    POSTGRES_PORT= 5432
    POSTGRES_DATABASE= full-stack-javascript
    POSTGRES_DATABASE_test= full-stack-javascript_test
    JWT_SECRET= hVmYp3s6v9y$B&EH@McQfTjWnZr4t7w

## Steps to start the application
- Install the required packages ```yarn install```
- Run the script to run all migrations: ```yarn migration:generate```
- To start the application: ```yarn start:prod```
- For testing it will build and migrate and start jasmine by this script: ```yarn start:test```

## Scripts
- Install dependencies: ```yarn install``` 
- To start the server: ```yarn start``` 
- To start the server with nodemon: ```yarn start:dev```
- To start the server in production: ```yarn start:prod``` it will run build before start
- To start the test with jasmine: ```yarn start:test``` it will run build before start and migrate test db
- To run all migration files: ```yarn migration:run```
- To revert the migration: ```yarn migration:run```
- To generate new migration: ```yarn migration:generate```

## API Requirement
Check the REQUIREMENT.md for the data shape and the endpoint as required

## The File Structure
```
-Udacity-storefront
├── dist
├── migrations                 
├── node_module
├── spec
│   └── support 
│         └── jasmine.json 
├── src
│   │── middleware
│   │   └── jwt-auth.middleware.ts
│   │── tests
│   │   │── helpers
│   │   │    └── reporter.ts
│   │   │── user.spec.ts
│   │   └── product.spec.ts
│   │── modules
│   │   │── order
│   │   │    └── model
│   │   │    |      |
|   |   │    |      └── order.model.ts  
|   |   |    └── order.route.ts
|   |   |  
│   │   │── product
│   │   │    └── model
│   │   │    |      |
|   |   │    |      └── product.model.ts  
|   |   |    └── interface 
│   │   │    |      |
|   |   │    |      └── product.ts 
|   |   |    └── product.route.ts
|   |   |
│   │   │── user
│   │   │    └── model
│   │   │    |      |
|   |   │    |      └── user.model.ts 
|   |   |    └── interface 
│   │   │    |      |
|   |   │    |      └── user.ts 
|   |   |    └── user.route.ts
|   |── app.ts
|   |── routes.ts
│   └── server.ts 
|── .env
├── .eslintrc.json                  
|── .gitignore
├── .prettierrc
|── database.json
├── nodemon.json                  
├── package.json
├── README.md                  
├── tsconfig.json
└── yarn.lock
```