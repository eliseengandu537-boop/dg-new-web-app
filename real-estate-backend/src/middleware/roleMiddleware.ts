import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user || req.user.role !== "admin") {
    res.status(403).json({ error: "Forbidden: Admin access required." });
    return;
  }
  next();
};

export const requireClient = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized." });
    return;
  }
  next();
};
