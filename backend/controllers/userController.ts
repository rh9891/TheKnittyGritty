import User, { IUserDocument } from "../models/userModel.js";
import { AuthenticatedRequest } from "../middleware/authMiddleware.js";
import { USER_NOT_FOUND_ERROR_MESSAGE } from "../../frontend/constants.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js"; // @desc    Authorize user and get token

// @desc    Authorize user and get token
// @route   GET /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }

  const { email, password } = req.body;
  const user: IUserDocument | null = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id as string, jwtSecret);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Knot quite right. Please check your email or password.");
  }
});

// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("This stitch is taken! Try a different email.");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id as string, process.env.JWT_SECRET as string);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Tangled input! Please check your details and try again.");
  }
});

// @desc    Logout user and clear cookies
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res
    .status(200)
    .json({ message: "Thread snipped! You’re successfully logged out." });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const user = await User.findById(req.user?._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error(USER_NOT_FOUND_ERROR_MESSAGE);
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(
  async (req: AuthenticatedRequest, res) => {
    const user = await User.findById(req.user?._id);

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
    } else {
      res.status(404);
      throw new Error(USER_NOT_FOUND_ERROR_MESSAGE);
    }
  },
);

// @desc    Get users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error(USER_NOT_FOUND_ERROR_MESSAGE);
  }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("You can’t delete an admin user.");
    }
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "User deleted successfully." });
  } else {
    res.status(404);
    throw new Error(USER_NOT_FOUND_ERROR_MESSAGE);
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

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
  } else {
    res.status(404);
    throw new Error(USER_NOT_FOUND_ERROR_MESSAGE);
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
