import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();
export const authenticator = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(verified.id).select("-password");
      console.log(req.user.email + " login verified".green);
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized: BAD TOKEN");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized: NO TOKEN");
  }
});

export const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("User is not an admin");
  }
});
