/* Replace with your SQL commands */
CREATE TYPE status AS ENUM ('ACTIVE','COMPLETE');

CREATE TABLE orders(
   	id BIGSERIAL PRIMARY KEY,
    user_id INTEGER,
    status status NOT NULL DEFAULT 'ACTIVE',

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE 
);