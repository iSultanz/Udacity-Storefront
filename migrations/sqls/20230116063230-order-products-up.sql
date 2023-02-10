/* Replace with your SQL commands */
CREATE TABLE order_products(
    id BIGSERIAL PRIMARY KEY,
    quantity INTEGER,
    product_id INTEGER,
    order_id INTEGER,

    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
);