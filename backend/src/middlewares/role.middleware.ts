import { Response, NextFunction } from "express";
import { Role } from "../generated/prisma/enums.js";
import { AuthRequest } from "../types/index.js";
import { AppError } from "../utils/appError.js";

export const restrictTo = (...allowedRoles: Role[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AppError("Unauthorized: User not authenticated", 401));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError(
          "Forbidden: You do not have permission to perform this action",
          403,
        ),
      );
    }

    next();
  };
};
