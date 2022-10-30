import { Router, Request, Response } from "express";

const routes: Router = Router();

routes.get("/", (req: Request, res: Response) => {
  res.send("s");
});

export default routes;
