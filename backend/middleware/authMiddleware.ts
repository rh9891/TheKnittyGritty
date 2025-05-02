import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import asyncHandler from "./asyncHandler.js";
import User, { IUserDocument } from "../models/userModel.js";

interface AuthenticatedRequest extends Request {
  user?: IUserDocument;
}

const protect = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, jwtSecret) as { userId: string };
        req.user = await User.findById(decoded.userId).select("-password");
        next();
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error("Not authorized. Token failed");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized. No token");
    }
  },
);

const admin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin.");
  }
};

export { protect, admin };
