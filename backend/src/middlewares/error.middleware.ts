import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError.js";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const statusCode =
    err instanceof AppError ? err.statusCode : err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(
    `[ERROR] ${req.method} ${req.originalUrl} - Status: ${statusCode} - ${message}`,
  );

  res.status(statusCode).json({
    status: statusCode >= 400 && statusCode < 500 ? "fail" : "error",
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
