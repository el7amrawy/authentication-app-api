import { Users } from "../models/users";
import { Router, Request, Response } from "express";
import {
  verifyAuthToken,
  createToken,
  checkUser,
  checkEmail,
} from "../services/authorization";

const u = new Users();

const usersRoutes = Router();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await u.index();
    res.json(users);
  } catch (err) {
    res.status(404).json(`can't find users ==> ${err}`);
  }
};

const show = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await u.show(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json("user not found");
    }
  } catch (err) {
    res.status(404).json(`can't find user ${id} ==> ${err}`);
  }
};

const create = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await u.create(email, password);
    res.json({ token: createToken(user), user: user });
  } catch (err) {
    res.status(400).json(`can't create user ==> ${err}`);
  }
};

const update = async (req: Request, res: Response) => {
  const { user } = req.body;

  try {
    const updatedUser = await u.update(user);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json(`can't update user  ==> ${err}`);
  }
};

const rm = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await u.delete(id);
    res.json(user);
  } catch (err) {
    res.status(400).json(`can't delete user ${id} ==> ${err}`);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const { id, password } = req.body;

  try {
    const user = await u.authenticate(id, password);
    if (user) {
      res.json({ token: createToken(user), user: user });
    } else {
      throw new Error("wrong password");
    }
  } catch (err) {
    res.status(400).json(`can't authenticate user ${id} ==> ${err}`);
  }
};

usersRoutes.get("/users", verifyAuthToken, index);
usersRoutes.get("/users/:id", verifyAuthToken, checkUser, show);
usersRoutes.post("/users", checkEmail, create);
usersRoutes.post("/users/auth", authenticate);
usersRoutes.post("/users/:id", verifyAuthToken, checkUser, checkEmail, update);
usersRoutes.delete("/users/:id", verifyAuthToken, checkUser, rm);

export default usersRoutes;
