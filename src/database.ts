import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  // local test
  POSTGRES_TEST_DB,
  // circleci
  CI_POSTGRES_USER,
  CI_POSTGRES_PASSWORD,
  CI_POSTGRES_DB,
  // prod
  DATABASE_URL,
} = process.env;

let { ENV } = process.env;
ENV = ENV?.replace(/\s/g, "");

const dev: pg.ConnectionConfig = {
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
};

const test: pg.ConnectionConfig = {
  database: POSTGRES_TEST_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
};

const circleci: pg.ConnectionConfig = {
  database: CI_POSTGRES_DB,
  user: CI_POSTGRES_USER,
  password: CI_POSTGRES_PASSWORD,
};

const client = new pg.Pool(
  ENV === "dev"
    ? dev
    : ENV === "test"
    ? test
    : ENV === "circleci"
    ? circleci
    : { connectionString: DATABASE_URL }
);

export default client;
