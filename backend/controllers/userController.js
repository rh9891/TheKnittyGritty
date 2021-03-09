import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// Route to authenticate the user and get a token. POST request to "/api/user/login". Public route.
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password.");
  }
});

// Route to get user profile. GET request to "/api/users/profile". Private route.
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("User profile accessed successfully.");
});

export { authUser, getUserProfile };
