import { OrderInput } from '../interface/order';
import {
  createOrder,
  getAllOrder,
  getUserOrders,
  updateOrderStatus,
} from '../models/order.model';

// name, price, category as body
describe('testing some of the order model models', () => {
  it('test for create order model to make sure it work perfect', async () => {
    const order: OrderInput = {
      quantity: '3',
      productId: '1',
    };
    const result: string = await createOrder(order, '1');
    expect(result).toBe('OrderCreated Successfully ..');
  });

  it('test for get order model to make sure it work perfect', async () => {
    const order = await getAllOrder();
    expect(order.length).toBeGreaterThanOrEqual(1);
  });
});
it('test for get user order model to make sure it work perfect', async () => {
  const order = await getUserOrders(1);
  expect(order.userId).toBe(1);
});
it('test for update order by id model to make sure it work perfect', async () => {
  const result = await updateOrderStatus(1);
  expect(result).toBe('order with id 1 has been updated');
});
