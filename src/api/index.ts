import express, { Router, Request, Response } from "express";
import usersRoutes from "../handlers/users";
import dashboardRoutes from "../handlers/dashboard";
import uploadRoutes from "./upload";
import path from "path";
import { appRoot } from "../services/uploadImages";

const routes: Router = Router();

routes.use("/upload", uploadRoutes);
routes.use(dashboardRoutes);
routes.use(usersRoutes);
routes.use(
  "/uploads/images",
  express.static(path.join(appRoot, "uploads", "images"))
);

routes.all("*", (_req: Request, res: Response) => {
  res.status(404).send("<h1>404 not found</h1>");
});

export default routes;
