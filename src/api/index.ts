import { Router, Request, Response } from "express";
import usersRoutes from "../handlers/users";

const routes: Router = Router();

routes.use(usersRoutes);

routes.get("/", (_req: Request, res: Response) => {
  res.send("s");
});

export default routes;
