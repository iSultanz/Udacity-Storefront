import { Order, OrderInput } from '../interface/order';
import { pool } from '../server';

export const getUserOrders = async (
  userId: number,
  body?: string,
): Promise<Order> => {
  //check if the user send a status
  const status = await statusValidation(body);
  let validate = true;
  if (status) {
    validate = await validateCorrectStatus(body);
  }
  if (validate === false) {
    return;
  }
  //get the current user ..
  let sql = `SELECT * FROM orders WHERE user_id = '${userId}' AND status= '${status.toUpperCase()}'`;

  if (status.length == 0) {
    sql = `SELECT * FROM orders WHERE user_id = '${userId}'`;
  }

  const query = await pool.query(sql);
  if (query.rows.length == 0) {
    return;
  }
  const { rows } = query;
  const { id } = rows[0];
  const detailedOrder = await pool.query(`
  SELECT * FROM order_products op JOIN orders o ON op.order_id=o.id join products p ON op.product_id =p.id
  WHERE o.id=${id}`);
  if (detailedOrder.rows.length == 0) {
    return;
  }
  const orders = detailedOrder.rows[0];
  const result: Order = {
    id: parseInt(orders.order_id),
    userId: orders.user_id,
    status: orders.status,
    cart: {
      itemId: orders.product_id,
      item: orders.name,
      price: `${orders.price}$`,
      category: orders.category,
    },
  };

  return result;
};

export const getAllOrder = async (): Promise<Order[] | string> => {
  const detailedOrder = await pool.query(`
  SELECT * FROM order_products op JOIN orders o ON op.order_id=o.id join products p ON op.product_id =p.id`);
  if (detailedOrder.rows.length == 0) {
    return 'order not found';
  }
  const orders = detailedOrder.rows;
  const results: Order[] = [];
  for (const order of orders) {
    const result: Order = {
      id: parseInt(order.order_id),
      userId: order.user_id,
      status: order.status,
      cart: {
        itemId: order.product_id,
        item: order.name,
        price: `${order.price}$`,
        category: order.category,
      },
    };
    results.push(result);
  }
  return results;
};

export const createOrder = async (
  body: OrderInput,
  userId: string,
): Promise<string> => {
  const validate = await orderValidation(body);
  if (validate === false) {
    return 'please enter a valid credential';
  }
  const { quantity, productId } = body;

  //get the current user ..
  try {
    const sql = `INSERT INTO orders(user_id,status) VALUES(${parseInt(
      userId,
    )},'ACTIVE') RETURNING *`;
    const query = await pool.query(sql);
    const { rows } = query;
    const createdOrder = rows[0];
    const { id } = createdOrder;

    const productOrder = `INSERT INTO order_products(quantity,product_id,order_id) VALUES(${parseInt(
      quantity,
    )},${parseInt(productId)},${parseInt(id)})`;
    await pool.query(productOrder);

    return 'OrderCreated Successfully ..';
  } catch (err) {
    return 'Internal Server Error';
  }
};

export const updateOrderStatus = async (id: number): Promise<string> => {
  try {
    const exist = await pool.query(`SELECT * FROM orders WHERE id = ${id}`);
    const order = exist.rows;
    if (order.length == 0) {
      return 'order not found';
    }
    const sql = `UPDATE orders SET status='COMPLETE' WHERE id =${id}`;
    const query = await pool.query(sql);

    return `order with id ${id} has been updated`;
  } catch (err) {
    return 'Internal Server Error';
  }
};

export const deleteOrder = async (id: number): Promise<string> => {
  const query = await pool.query(`SELECT * FROM orders WHERE id = ${id}`);
  const order = query.rows;
  if (order.length == 0) {
    return 'order not found';
  }
  await pool.query(`DELETE FROM orders WHERE id = ${id}`);
  return 'Order deleted successfully ...';
};

const orderValidation = async (body: any): Promise<boolean> => {
  try {
    const { quantity, productId } = body;
    if (!quantity || !productId) {
      console.log('first false');

      return false;
    }
    const query = await pool.query(
      `SELECT * FROM products WHERE id =${productId}`,
    );
    if (query.rows.length == 0) {
      console.log('second false', query.rows[0]);
      return false;
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const statusValidation = async (body: any): Promise<string> => {
  try {
    const { status } = body;
    if (status) {
      return status;
    }
    return '';
  } catch (err) {
    return '';
  }
};

const validateCorrectStatus = async (body: any): Promise<boolean> => {
  try {
    const { status } = body;
    if (
      status.toUpperCase() === 'ACTIVE' ||
      status.toUpperCase() === 'COMPLETE'
    ) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};
