import client from "../database";
import bcrypt from "bcrypt";

type User = {
  id: string;
  username: string;
  name: string;
  phone: string;
  email: string;
  bio: string;
  password: string;
};

class Users {
  async index(): Promise<User[]> {
    const sql = "SELECT id , username , name , phone , email , bio FROM users";

    try {
      const conn = await client.connect();
      const res = await conn.query(sql);
      const users: User[] = res.rows;

      conn.release();

      return users;
    } catch (err) {
      throw new Error(`db error couldn't show users ==> ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    const sql =
      "SELECT id , username , name , phone , email , bio FROM users WHERE id=($1)";

    try {
      const conn = await client.connect();
      const res = await conn.query(sql, [id]);
      const user: User = res.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`db error couldn't show user ${id} ==> ${err}`);
    }
  }

  async create(email: string, password: string): Promise<User> {
    const { PEPPER, ROUNDS } = process.env;

    const hashedPass = bcrypt.hashSync(
      password + PEPPER,
      parseInt(ROUNDS as unknown as string)
    );

    const sql =
      "INSERT INTO users (email,password) VALUES ($1,$2) RETURNING id , username , name , phone , email , bio";

    try {
      const conn = await client.connect();
      const res = await conn.query(sql, [email, hashedPass]);
      const user: User = res.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`db error couldn't create user ==> ${err}`);
    }
  }
}

export { User, Users };
