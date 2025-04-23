import { NextFunction, Request, Response } from "express";

interface CustomError extends Error {
  statusCode?: number;
  kind?: string;
  code?: number;
}

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || "Yarn it! Something went wrong!";

  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = "Product not found.";
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
