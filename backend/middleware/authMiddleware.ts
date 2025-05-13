import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import asyncHandler from "./asyncHandler.js";
import User, { IUserDocument } from "../models/userModel.js";

export interface AuthenticatedRequest extends Request {
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
      } catch (err) {
        console.log(err);
        res.status(401);
        throw new Error(
          "Your session has unraveled. Token verification failed.",
        );
      }
    } else {
      res.status(401);
      throw new Error("You forgot your yarn! (No token.)");
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
    throw new Error("You’re not the head knitter here. Admin access only.");
  }
};

export { protect, admin };
