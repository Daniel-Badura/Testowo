import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import token from "../utils/token.js";

// @desc        Authenticate user and get the token
// @route       POST /api/users/login
// @access      Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.checkPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      token: token(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc        Get user profile
// @route       GET /api/users/profile
// @access      Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc        Post new user
// @route       POST /api/users
// @access      Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, lastname, password, email, phone, isAdmin } = req.body;
  const checkUser = await User.findOne({ email });
  const verificationCode = Math.random().toString(36).substring(2, 8);

  if (checkUser) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    lastname,
    email,
    password,
    phone,
    isAdmin,
    verificationCode,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      token: token(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc        Update user profile
// @route       PUT /api/users/profile
// @access      Private
export const updateMyProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    if (await user.checkPassword(req.body.password)) {
      console.log("Password Confirmed".green);
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.lastname = req.body.lastname || user.lastname;
      user.phone = req.body.phone || user.phone;
      if (req.body.newPassword) {
        user.password = req.body.newPassword;
      }
    } else {
      throw new Error("Password incorrect");
    }
    const userUpdated = await user.save();
    res.json({
      _id: userUpdated._id,
      name: userUpdated.name,
      lastname: userUpdated.lastname,
      email: userUpdated.email,
      phone: userUpdated.phone,
      token: token(userUpdated._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc        get email verification
// @route       PUT /api/users/profile/verify'
// @access      Private
export const putEmailVerification = asyncHandler(async (req, res) => {
  const verificationCode = req.body.verificationCode;
  const user = await User.findById(req.user._id);

  if (user) {
    if (verificationCode === user.verificationCode) {
      user.isVerified = true;
      const userUpdated = await user.save();
      res.json({
        _id: userUpdated._id,
        name: userUpdated.name,
        lastname: userUpdated.lastname,
        email: userUpdated.email,
        phone: userUpdated.phone,
        isVerified: userUpdated.isVerified,
        token: token(userUpdated._id),
      });
    } else {
      res.status(404);
      throw new Error("Incorrect Verification Code ");
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc        get users list
// @route       GET /api/users/list'
// @access      Private
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc        delete users list
// @route       DELETE /api/users/list'
// @access      Private
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (user) {
    // await user.remove();
    res.json({ message: "User removed" });
  } else {
    // res.status(404);
    throw new Error("User not found");
  }
});

// @desc        get user by id
// @route       GET /api/users/:id'
// @access      Private
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc        Update user profile
// @route       PUT /api/users/profile
// @access      Private
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);
  if (user) {
    console.log("Password Confirmed".green);
    user.name = req.body.name || user.name;
    if (user.email !== req.body.email) {
      user.email = req.body.email;
    }
    user.lastname = req.body.lastname || user.lastname;
    user.phone = req.body.phone || user.phone;
    user.isAdmin = req.body.isAdmin;

    const userUpdated = await user.save();
    res.json({
      _id: userUpdated._id,
      name: userUpdated.name,
      lastname: userUpdated.lastname,
      email: userUpdated.email,
      phone: userUpdated.phone,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
