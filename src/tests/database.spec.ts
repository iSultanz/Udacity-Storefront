import supertest from 'supertest';
import app from '../app';
import { Order } from '../interface/order';
import { Product } from '../interface/product';
import { UserRetrieve, UserToken } from '../interface/user';

const request = supertest(app);

describe('testing for user endpoints', () => {
  it('test for signUp endpoint to make sure it work perfect', async () => {
    const res = await request
      .post('/user/signUp')
      .set('Content-type', 'application/json')
      .send({
        email: 'testingEmail@test.com',
        firstName: 'testFirstName',
        lastName: 'testLastName',
        password: 'SuperPassword',
      });
    const result: UserToken = res.body;
    expect(res.status).toBe(200);
    expect(result).toBeDefined();
  });
  it('test for signIn endpoint to make sure it work perfect and generate token', async () => {
    const res = await request
      .post('/user/signIn')
      .set('Content-type', 'application/json')
      .send({
        email: 'testingEmail@test.com',
        password: 'SuperPassword',
      });
    const token: string = res.body.token;
    expect(res.status).toBe(200);
    expect(token.length).toBeGreaterThan(2);
  });

  it('test get all user endpoint', async () => {
    const token = await generateToken();
    await createUser();
    const res = await request.get('/user').auth(token, { type: 'bearer' });
    const result: UserRetrieve[] = res.body;
    expect(res.status).toBe(200);
    expect(result.length).toBeGreaterThan(0);
  });
  it('test get user by id endpoint', async () => {
    const token = await generateToken();
    const res = await request.get(`/user/${1}`).auth(token, { type: 'bearer' });
    const result: UserRetrieve = res.body;
    expect(res.status).toBe(200);
    expect(result.email).toBeDefined();
  });
});

describe('testing some of the product model endpoints', () => {
  it('test for create product endpoint to make sure it work perfect', async () => {
    const token = await generateToken();
    const res = await request
      .post('/product/create')
      .auth(token, { type: 'bearer' })
      .send({
        name: 'iPhone',
        price: '125.5',
        category: 'Phones',
      });
    expect(res.status).toBe(200);
  });

  it('test for get product endpoint to make sure it work perfect', async () => {
    const token = await generateToken();
    await createprod(token);
    const res = await request.get('/product').auth(token, { type: 'bearer' });
    const product: Product[] = res.body;
    expect(res.status).toBe(200);
    expect(product.length).toBeGreaterThanOrEqual(1);
  });
  it('test for get product by id endpoint to make sure it work perfect', async () => {
    const token = await generateToken();
    const res = await request
      .get(`/product/${1}`)
      .auth(token, { type: 'bearer' });
    const product: Product = res.body;
    expect(res.status).toBe(200);
    expect(product.name.length).toBeGreaterThanOrEqual(1);
  });
});

describe('testing some of the order model endpoints', () => {
  it('test for create order endpoint to make sure it work perfect', async () => {
    const token = await generateToken();
    const res = await request
      .post('/order/create')
      .auth(token, { type: 'bearer' })
      .send({
        quantity: '3',
        productId: '1',
      });
    expect(res.status).toBe(200);
  });

  it('test for get order endpoint to make sure it work perfect', async () => {
    const token = await generateToken();
    const res = await request.get('/order').auth(token, { type: 'bearer' });
    const order: Order[] = res.body;
    expect(res.status).toBe(200);
    expect(order.length).toBeGreaterThanOrEqual(1);
  });

  it('test for get user order endpoint to make sure it work perfect', async () => {
    const token = await generateToken();
    const res = await request
      .get('/order/user')
      .auth(token, { type: 'bearer' });
    const order: Order = res.body;
    expect(res.status).toBe(200);
    expect(order.status).toBe('ACTIVE');
  });
  it('test for update order by id endpoint to make sure it work perfect', async () => {
    const token = await generateToken();
    const res = await request
      .patch(`/order/update/${1}`)
      .auth(token, { type: 'bearer' });
    const result = res.body;
    expect(res.status).toBe(200);
    expect(result).toBe('order with id 1 has been updated');
  });
});

const generateToken = async (): Promise<string> => {
  const res = await request
    .post('/user/signIn')
    .set('Content-type', 'application/json')
    .send({
      email: 'testingEmail@test.com',
      password: 'SuperPassword',
    });
  const token = res.body.token;
  return token;
};

const createprod = async (token: string) => {
  const res = await request
    .post('/product/create')
    .auth(token, { type: 'bearer' })
    .send({
      name: 'iPad',
      price: '56.5',
      category: 'Phones',
    });
};

const createUser = async () => {
  await request
    .post('/user/signUp')
    .set('Content-type', 'application/json')
    .send({
      email: 'testPp@test.com',
      firstName: 'testFirstName',
      lastName: 'testLastName',
      password: 'SuperPassword',
    });
};
