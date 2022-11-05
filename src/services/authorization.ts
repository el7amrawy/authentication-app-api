import { Request, Response } from "express";
import Jwt from "jsonwebtoken";

const { TOKEN_SECRET } = process.env;

const verifyAuthToken = async (req: Request, res: Response, next: Function) => {
  try {
    const token = req.headers.authorization?.split as unknown as string;

    Jwt.verify(token, TOKEN_SECRET as unknown as string);
    next();
  } catch (err) {
    res.status(401).json(err);
  }
};

export default verifyAuthToken;
