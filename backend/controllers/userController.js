import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// Route to authenticate the user and get a token. POST request to "/api/user/login". Public route.
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  res.send(email, password);
});

export { authUser };
