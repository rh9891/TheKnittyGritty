import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";
const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    if (token) {
        try {
            const decoded = jwt.verify(token, jwtSecret);
            req.user = await User.findById(decoded.userId).select("-password");
            next();
        }
        catch (err) {
            console.log(err);
            res.status(401);
            throw new Error("Your session has unraveled. Token verification failed.");
        }
    }
    else {
        res.status(401);
        throw new Error("You forgot your yarn! (No token.)");
    }
});
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    }
    else {
        res.status(401);
        throw new Error("You’re not the head knitter here. Admin access only.");
    }
};
export { protect, admin };
