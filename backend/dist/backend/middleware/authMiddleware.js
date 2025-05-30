"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const asyncHandler_js_1 = __importDefault(require("./asyncHandler.js"));
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
const protect = (0, asyncHandler_js_1.default)(async (req, res, next) => {
    const token = req.cookies.jwt;
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
            req.user = await userModel_js_1.default.findById(decoded.userId).select("-password");
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
exports.protect = protect;
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    }
    else {
        res.status(401);
        throw new Error("You’re not the head knitter here. Admin access only.");
    }
};
exports.admin = admin;
