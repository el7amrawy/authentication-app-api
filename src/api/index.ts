import { Router, Request, Response } from "express";
import usersRoutes from "../handlers/users";
import dashboardRoutes from "../handlers/dashboard";

const routes: Router = Router();

routes.use(dashboardRoutes);
routes.use(usersRoutes);

routes.all("*", (_req: Request, res: Response) => {
  res.status(404).send("404 not found");
});

export default routes;
