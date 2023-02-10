import { pool } from '../server';
import { Product } from '../interface/product';

//create product ..
export const createProduct = async (body: Product): Promise<string> => {
  const validate = await validateCreateProduct(body);
  if (validate === false) {
    return 'please enter a valid credential';
  }
  const { name, price, category } = body;
  try {
    const sql = `INSERT INTO products(name,price,category) VALUES('${name}',${price},'${category}')`;
    await pool.query(sql);
    return 'Product Created Successfully ...';
  } catch (err) {
    console.log(err);
    return 'Internal Server Error';
  }
};
// get all products
export const getProducts = async (): Promise<Product[]> => {
  const query = await pool.query(`SELECT * FROM products`);
  const products: Product[] = query.rows;

  return products;
};

//get product by id ..
export const getProductById = async (id: number): Promise<Product> => {
  const query = await pool.query(`SELECT * FROM products WHERE id = ${id}`);
  const product: Product = query.rows[0];
  return product;
};

//delete product by id .....
export const deleteProduct = async (id: number): Promise<string> => {
  const query = await pool.query(`SELECT * FROM products WHERE id = ${id}`);
  const product = query.rows;
  if (product.length == 0) {
    return 'Product not found ...';
  }
  await pool.query(`DELETE FROM products WHERE id = ${id}`);
  return 'Product deleted successfully ...';
};

const validateCreateProduct = async (body: Product): Promise<boolean> => {
  try {
    const { name, price, category } = body;
    if (!name || !price || !category) {
      return false;
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
