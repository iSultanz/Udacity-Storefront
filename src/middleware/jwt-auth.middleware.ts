import jwt from 'jsonwebtoken';

export const authJwt = async (auth: any) => {
  const token = auth ? auth.split(' ')[1] : '';
  jwt.verify(token, process.env.JWT_SECRET);
};

export const currentUser = async (auth: any): Promise<jwtPayload> => {
  const token = auth ? auth.split(' ')[1] : '';
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    const decode: any = jwt.decode(token);
    const payload: jwtPayload = decode.user;
    return payload;
  } catch (err) {
    return null;
  }
};
export interface jwtPayload {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}
