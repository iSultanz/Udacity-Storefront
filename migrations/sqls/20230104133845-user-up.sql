/* Replace with your SQL commands */
CREATE TABLE users(
   	id BIGSERIAL PRIMARY KEY ,
   	email varchar(200),
   	password varchar(200) NOT NULL,
    firstname varchar(200) NOT NULL,
    lastname varchar(200) NOT NULL,
    salt varchar(255)
);