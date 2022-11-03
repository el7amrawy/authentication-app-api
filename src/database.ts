import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_DB,
  ENV,
} = process.env;

const client = new pg.Pool({
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT as unknown as string),
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export default client;
