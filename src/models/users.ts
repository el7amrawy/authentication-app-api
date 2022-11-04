import client from "../database";
import bcrypt from "bcrypt";

type User = {
  id: string;
  username?: string;
  name?: string;
  phone?: string;
  email: string;
  bio?: string;
  password?: string;
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

  async update(user: User): Promise<User> {
    const sql =
      "UPDATE users SET username=($1) , name=($2) , phone=($3) , email=($4) , bio=($5) WHERE id=($6) RETURNING id , username , name , phone , email , bio";

    try {
      const conn = await client.connect();
      const res = await conn.query(sql, [
        user.username,
        user.name,
        user.phone,
        user.email,
        user.bio,
        user.id,
      ]);
      const updatedUser = res.rows[0];

      conn.release();
      return updatedUser;
    } catch (err) {
      throw new Error(`db error couldn't update user ${user.id} ==> ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    const sql =
      "DELETE from users WHERE id=$1 RETURNING id , username , name , phone , email , bio";

    try {
      const conn = await client.connect();
      const res = await conn.query(sql, [id]);
      const user = res.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`db error couldn't delete user ${id} ==> ${err}`);
    }
  }
}

export { User, Users };
