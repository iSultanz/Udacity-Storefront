import express, { Router, Request, Response } from 'express';
import {
  deleteUser,
  getUserById,
  getUsers,
  signIn,
  signUp,
} from '../models/user.model';
import { authJwt } from '../middleware/jwt-auth.middleware';
import bodyParser from 'body-parser';
import { UserRetrieve, UserToken } from '../interface/user';
const userRouter: Router = Router();

//register and create a user take body {email, firstName, lastName, password} signUp
userRouter.post(
  '/user/signUp',
  bodyParser.json(),
  async (req: Request, res: Response): Promise<Response<string>> => {
    const result: string = await signUp(req.body);
    return res.send(result);
  },
);

//login with the user to generate a token take body {email, password}
userRouter.post(
  '/user/signIn',
  bodyParser.json(),
  async (
    req: Request,
    res: Response,
  ): Promise<Response<UserToken | string>> => {
    const result: UserToken | string = await signIn(req.body);
    if (typeof result == 'string') {
      return res.send(result).status(400);
    }
    return res.json(result);
  },
);

//get all users
userRouter.get(
  '/user',
  async (req: Request, res: Response): Promise<Response<UserRetrieve[]>> => {
    try {
      //send authorization header to the middleware to verify ..
      await authJwt(req.headers.authorization);
    } catch (err) {
      return res.send('Invalid Token').status(401);
    }
    const result: UserRetrieve[] = await getUsers();
    if (result.length == 0) {
      return res.send('No User found');
    }
    return res.send(result);
  },
);

//get user by id as param   const id = parseInt(req.params.id); getUserById

userRouter.get(
  '/user/:id',
  async (req: Request, res: Response): Promise<Response<UserRetrieve[]>> => {
    try {
      //send authorization header to the middleware to verify ..
      await authJwt(req.headers.authorization);
    } catch (err) {
      return res.send('Invalid Token').status(401);
    }
    const id = parseInt(req.params.id);
    const result: UserRetrieve = await getUserById(id);
    if (!result) {
      return res.send('No User found');
    }
    return res.send(result);
  },
);

//delete user by id as param
userRouter.delete(
  '/user/delete/:id',
  async (req: Request, res: Response): Promise<Response<string>> => {
    try {
      //send authorization header to the middleware to verify ..
      await authJwt(req.headers.authorization);
    } catch (err) {
      return res.send('Invalid Token').status(401);
    }
    const id = parseInt(req.params.id);
    const result: string = await deleteUser(id);    
    return res.json(result);
  },
);

export default userRouter;
