import { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { User } from "../models/users";

const token_secret = process.env.TOKEN_SECRET as unknown as string;

const verifyAuthToken = (req: Request, res: Response, next: Function) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] as unknown as string;
    Jwt.verify(token, token_secret);

    next();
  } catch (err) {
    res.status(401).json(err);
  }
};

const createToken = (user: User): string => {
  const token = Jwt.sign(user, token_secret);
  return token;
};

const checkUser = (req: Request, res: Response, next: Function) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] as unknown as string;
    const { id } = req.params;

    const user: User = Jwt.decode(token) as unknown as User;

    if (`${user.id}` !== id) {
      throw new Error("access denied");
    }
    next();
  } catch (err) {
    res.status(403).json(`${err}`);
  }
};
export { verifyAuthToken, createToken, checkUser };
