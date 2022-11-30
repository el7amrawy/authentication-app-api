import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
} = process.env;

let { ENV } = process.env;
ENV = ENV?.replace(/\s/g, "");

const client = new pg.Pool({
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT as unknown as string),
  database:
    ENV === "dev" ? POSTGRES_DB : ENV === "test" ? POSTGRES_TEST_DB : "",
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export default client;
