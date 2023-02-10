import express, { Router, Request, Response } from 'express';
import { Product } from '../interface/product';
import { authJwt } from '../middleware/jwt-auth.middleware';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
} from '../models/product.model';

const productRouter: Router = Router();
//create product takes input name, price, category as body
productRouter.post(
  '/product/create',
  async (req: Request, res: Response): Promise<Response<string>> => {
    try {
      //send authorization header to the middleware to verify ..
      await authJwt(req.headers.authorization);
    } catch (err) {
      return res.send('Invalid Token').status(401);
    }
    const result: string = await createProduct(req.body);
    return res.send(result);
  },
);
//get all products
productRouter.get(
  '/product',
  async (req: Request, res: Response): Promise<Response<Product[]>> => {
    const result: Product[] = await getProducts();
    if (result.length == 0) {
      return res.send('No product found');
    }
    return res.send(result);
  },
);

//get the product by id as param getProductById
productRouter.get(
  '/product/:id',
  async (req: Request, res: Response): Promise<Response<Product>> => {
    const id = parseInt(req.params.id);
    const result: Product = await getProductById(id);
    if (!result) {
      return res.send('No product found');
    }
    return res.send(result);
  },
);
//delete a product by id as param deleteProduct
productRouter.delete(
  '/product/delete/:id',
  async (req: Request, res: Response): Promise<Response<string>> => {
    try {
      //send authorization header to the middleware to verify ..
      await authJwt(req.headers.authorization);
    } catch (err) {
      return res.send('Invalid Token').status(401);
    }
    const id = parseInt(req.params.id);
    const result: string = await deleteProduct(id);

    return res.json(result);
  },
);

export default productRouter;
