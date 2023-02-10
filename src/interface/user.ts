export interface User {
  id?: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  salt: string;
}

export interface UserToken {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}

export interface LoginCredential {
  email: string;
  password: string;
}

export interface UserRetrieve {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserSignUp {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
