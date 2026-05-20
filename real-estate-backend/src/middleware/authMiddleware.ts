import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

const SECRET_KEY = JWT_SECRET;

export interface AuthUser {
  id: number;
  role: string;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as AuthUser;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
