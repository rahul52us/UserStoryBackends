import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode || 500).send({
    message: err.message || "Internal Server Error",
    data: err.data || "Internal Server Error",
    statusCode: err.statusCode || 500,
    success: err.success || false,
  });
};

export default errorMiddleware;
