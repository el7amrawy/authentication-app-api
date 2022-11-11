import { Request, Response, Router } from "express";
import DashboardQueries from "../services/dashboard";

const d = new DashboardQueries();
const dashboardRoutes = Router();

const getUserId = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await d.getUserId(email);
    if (user?.id) {
      res.json(user);
    } else {
      throw new Error("user not found");
    }
  } catch (err) {
    res.status(404).json(`${err}`);
  }
};

dashboardRoutes.post("/users/get_id", getUserId);

export default dashboardRoutes;
