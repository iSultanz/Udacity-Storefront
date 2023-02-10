import { pool } from '../server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  LoginCredential,
  User,
  UserRetrieve,
  UserSignUp,
  UserToken,
} from '../interface/user';

export const signUp = async (body: UserSignUp): Promise<string> => {
  const validate = await validateSignUp(body);
  if (validate === false) {
    return 'please enter a valid credential';
  }
  const { email, firstName, lastName, password } = body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const sql = `INSERT INTO users(email,firstname,lastname,password,salt) VALUES('${email}','${firstName}','${lastName}','${hashedPassword}','${salt}')`;
    const query = await pool.query(sql);
    return 'User Created Successfully ..';
  } catch (err) {
    console.log(err);
    return 'Internal Server Error';
  }
};
export const signIn = async (
  body: LoginCredential,
): Promise<UserToken | string> => {
  const { email, password } = body;
  try {
    const query = await pool.query(
      `SELECT * FROM users WHERE email = '${email}'`,
    );
    const user: User = query.rows[0];
    const validate = await validateUser(user, password);
    if (!validate) {
      return 'Incorrect Credential';
    }
    const accessToken = jwt.sign({ user: user }, process.env.JWT_SECRET);
    //append the token to the payload ...
    const result: UserToken = {
      id: user.id,
      email: user.email,
      firstName: user.firstname,
      lastName: user.lastname,
      token: accessToken,
    };

    return result;
  } catch (err) {
    return 'Internal Server Error Exception';
  }
};
//Delete user ..
export const deleteUser = async (id: number): Promise<string> => {
  const query = await pool.query(`SELECT * FROM users WHERE id = ${id}`);
  const user = query.rows[0];
  if (!user) {
    return 'User not found ...';
  }
  await pool.query(`DELETE FROM users WHERE id = ${id}`);
  return 'User deleted successfully ...';
};

// retrieve all registered users ..
export const getUsers = async (): Promise<UserRetrieve[]> => {
  const query = await pool.query(`SELECT * FROM users`);
  const users: User[] = query.rows;
  if (users.length == 0) {
    return;
  }
  const result: UserRetrieve[] = [];
  for (const user of users) {
    const obj: UserRetrieve = {
      id: user.id,
      email: user.email,
      firstName: user.firstname,
      lastName: user.lastname,
    };
    result.push(obj);
  }
  return result;
};
//get user by id ...
export const getUserById = async (id: number): Promise<UserRetrieve> => {
  const query = await pool.query(`SELECT * FROM users WHERE id = ${id}`);
  const user: User = query.rows[0];
  if (!user) {
    return;
  }
  const result: UserRetrieve = {
    id: user.id,
    email: user.email,
    firstName: user.firstname,
    lastName: user.lastname,
  };
  return result;
};

export const validateUser = async (
  user: User,
  enterdPassword: string,
): Promise<boolean> => {
  if (!user) {
    return false;
  }
  const { salt, password } = user;
  const passwordHash = await bcrypt.hash(enterdPassword, salt);
  if (password !== passwordHash) {
    return false;
  }
  return true;
};
export const validateSignUp = async (body: UserSignUp): Promise<boolean> => {
  try {
    const { email, firstName, lastName, password } = body;
    if (!email || !firstName || !lastName || !password) {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};
