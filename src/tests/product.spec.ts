import { Product } from '../interface/product';
import {
  createProduct,
  getProductById,
  getProducts,
} from '../models/product.model';

// name, price, category as body
describe('testing all of the product models', () => {
  it('test for create product model to make sure it work perfect', async () => {
    const product: Product = {
      name: 'iPhoneXS',
      price: 125.5,
      category: 'Phones',
    };
    const result: string = await createProduct(product);
    expect(result).toBe('Product Created Successfully ...');
  });

  it('test for get product model to make sure it work perfect', async () => {
    const product: Product[] = await getProducts();
    expect(product.length).toBeGreaterThanOrEqual(1);
  });

  it('test for get product by id model to make sure it work perfect', async () => {
    const product: Product = await getProductById(1);
    expect(product.name.length).toBeGreaterThanOrEqual(1);
  });
});
