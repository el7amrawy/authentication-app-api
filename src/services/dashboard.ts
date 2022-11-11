import client from "../database";
import { User } from "../models/users";

class DashboardQueries {
  async getUserId(email: string): Promise<User> {
    const sql = `SELECT id,email FROM users WHERE email='${email}'`;
    try {
      const conn = await client.connect();
      const res = await conn.query(sql);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(
        `db error couldn't show id where email=${email} ==> ${err}`
      );
    }
  }
}

export default DashboardQueries;
