import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/index.js";
import { AppError } from "../utils/appError.js";
import { verifyToken } from "../utils/jwt.js";

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Unauthorized: Missing or invalid token format', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return next(new AppError('Unauthorized: Token is invalid or expired', 401));
  }
};
