import { Router, Request, Response } from 'express';
import { Order } from '../interface/order';
import {
  authJwt,
  currentUser,
  jwtPayload,
} from '../middleware/jwt-auth.middleware';
import {
  createOrder,
  deleteOrder,
  getAllOrder,
  getUserOrders,
  updateOrderStatus,
} from '../models/order.model';

const orderRouter: Router = Router();
//create new order take body required { quantity, productId },
// OPTIONAL {userId} else will take it from the token createOrder

orderRouter.post(
  '/order/create',
  async (req: Request, res: Response): Promise<Response<string>> => {
    try {
      //send authorization header to the middleware to verify ..
      await authJwt(req.headers.authorization);
    } catch (err) {
      return res.send('Invalid Token').status(401);
    }
    //get the current user ..

    let userId = req.body?.userId;
    if (!req.body?.userId) {
      const user: jwtPayload = await currentUser(req.headers.authorization);
      userId = user.id;
    }

    const result: string = await createOrder(req.body, userId);
    console.log(result);

    return res.send(result);
  },
);
//get the current user orders take optional status = {ACTIVE, COMPLETE}
orderRouter.get(
  '/order/user',
  async (req: Request, res: Response): Promise<Response<Order>> => {
    try {
      //send authorization header to the middleware to verify ..
      await authJwt(req.headers.authorization);
    } catch (err) {
      return res.send('Invalid Token').status(401);
    }
    const user: jwtPayload = await currentUser(req.headers.authorization);
    if (req.body.status) {
      const result = await getUserOrders(parseInt(user.id), req.body.status);
    }
    const result = await getUserOrders(parseInt(user.id));
    return res.send(result);
  },
);

//get the all user orders
orderRouter.get(
  '/order',
  async (req: Request, res: Response): Promise<Response<Order[] | string>> => {
    try {
      //send authorization header to the middleware to verify ..
      await authJwt(req.headers.authorization);
    } catch (err) {
      return res.send('Invalid Token').status(401);
    }
    const result = await getAllOrder();
    return res.send(result);
  },
);

//delete order by id as param
orderRouter.delete(
  '/order/delete/:id',
  async (req: Request, res: Response): Promise<Response<string>> => {
    try {
      //send authorization header to the middleware to verify ..
      await authJwt(req.headers.authorization);
    } catch (err) {
      return res.send('Invalid Token').status(401);
    }
    if (!req.params.id) {
      return res.send('please enter order id');
    }
    const id = parseInt(req.params.id);
    const result: string = await deleteOrder(id);
    return res.json(result);
  },
);

//update order by id as param
orderRouter.patch(
  '/order/update/:id',
  async (req: Request, res: Response): Promise<Response<string>> => {
    try {
      //send authorization header to the middleware to verify ..
      await authJwt(req.headers.authorization);
    } catch (err) {
      return res.send('Invalid Token').status(401);
    }
    if (!req.params.id) {
      return res.send('please enter order id');
    }
    const id = parseInt(req.params.id);
    const result: string = await updateOrderStatus(id);
    return res.json(result);
  },
);

export default orderRouter;
