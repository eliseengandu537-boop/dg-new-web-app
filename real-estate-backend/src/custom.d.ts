import "express-serve-static-core";
import type { AuthUser } from "./middleware/authMiddleware";

declare module "express-serve-static-core" {
  interface Request {
    user?: AuthUser;
  }
}
