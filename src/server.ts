import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const {
  NODE_ENV,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_DATABASE,
  POSTGRES_DATABASE_test,
  POSTGRES_PORT,
} = process.env;

export const pool = new Pool({
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: NODE_ENV == 'dev' ? POSTGRES_DATABASE : POSTGRES_DATABASE_test,
  port: parseInt(POSTGRES_PORT),
  host: POSTGRES_HOST,
});
