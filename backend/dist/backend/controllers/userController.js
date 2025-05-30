"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUserById = exports.deleteUser = exports.getUsers = exports.updateUserProfile = exports.getUserProfile = exports.logoutUser = exports.registerUser = exports.authUser = void 0;
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
const constants_js_1 = require("../../shared/constants.js");
const asyncHandler_js_1 = __importDefault(require("../middleware/asyncHandler.js"));
const generateToken_js_1 = __importDefault(require("../utils/generateToken.js")); // @desc    Authorize user and get token
// @desc    Authorize user and get token
// @route   GET /api/users/login
// @access  Public
const authUser = (0, asyncHandler_js_1.default)(async (req, res) => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    const { email, password } = req.body;
    const user = await userModel_js_1.default.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        (0, generateToken_js_1.default)(res, user._id, jwtSecret);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }
    else {
        res.status(401);
        throw new Error("Knot quite right. Please check your email or password.");
    }
});
exports.authUser = authUser;
// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = (0, asyncHandler_js_1.default)(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await userModel_js_1.default.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("This stitch is taken! Try a different email.");
    }
    const user = await userModel_js_1.default.create({
        name,
        email,
        password,
    });
    if (user) {
        (0, generateToken_js_1.default)(res, user._id, process.env.JWT_SECRET);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }
    else {
        res.status(400);
        throw new Error("Tangled input! Please check your details and try again.");
    }
});
exports.registerUser = registerUser;
// @desc    Logout user and clear cookies
// @route   POST /api/users/logout
// @access  Private
const logoutUser = (0, asyncHandler_js_1.default)(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res
        .status(200)
        .json({ message: "Thread snipped! You’re successfully logged out." });
});
exports.logoutUser = logoutUser;
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = (0, asyncHandler_js_1.default)(async (req, res) => {
    const user = await userModel_js_1.default.findById(req.user?._id);
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }
    else {
        res.status(404);
        throw new Error(constants_js_1.USER_NOT_FOUND_ERROR_MESSAGE);
    }
});
exports.getUserProfile = getUserProfile;
// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = (0, asyncHandler_js_1.default)(async (req, res) => {
    const user = await userModel_js_1.default.findById(req.user?._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    }
    else {
        res.status(404);
        throw new Error(constants_js_1.USER_NOT_FOUND_ERROR_MESSAGE);
    }
});
exports.updateUserProfile = updateUserProfile;
// @desc    Get users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = (0, asyncHandler_js_1.default)(async (req, res) => {
    const users = await userModel_js_1.default.find({});
    res.status(200).json(users);
});
exports.getUsers = getUsers;
// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = (0, asyncHandler_js_1.default)(async (req, res) => {
    const user = await userModel_js_1.default.findById(req.params.id).select("-password");
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(404);
        throw new Error(constants_js_1.USER_NOT_FOUND_ERROR_MESSAGE);
    }
});
exports.getUserById = getUserById;
// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = (0, asyncHandler_js_1.default)(async (req, res) => {
    const user = await userModel_js_1.default.findById(req.params.id);
    if (user) {
        if (user.isAdmin) {
            res.status(400);
            throw new Error("You can’t delete an admin user.");
        }
        await userModel_js_1.default.deleteOne({ _id: user._id });
        res.status(200).json({ message: "User deleted successfully." });
    }
    else {
        res.status(404);
        throw new Error(constants_js_1.USER_NOT_FOUND_ERROR_MESSAGE);
    }
});
exports.deleteUser = deleteUser;
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = (0, asyncHandler_js_1.default)(async (req, res) => {
    const user = await userModel_js_1.default.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    }
    else {
        res.status(404);
        throw new Error(constants_js_1.USER_NOT_FOUND_ERROR_MESSAGE);
    }
});
exports.updateUser = updateUser;
