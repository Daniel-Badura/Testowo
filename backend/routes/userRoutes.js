import express from "express";

const router = express.Router();
import {
  authUser,
  putEmailVerification,
  getUserProfile,
  getUsers,
  registerUser,
  updateMyProfile,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { authenticator, isAdmin } from "../middleware/authMiddleware.js";

// Default route
router.route("/").post(registerUser);
// user ogin route
router.post("/login", authUser);
// user profile route
router.route("/list").get(authenticator, isAdmin, getUsers);
router
  .route("/profile")
  .get(authenticator, getUserProfile)
  .put(authenticator, updateMyProfile);
router.route("/profile/verify").put(authenticator, putEmailVerification);
router
  .route("/:id")
  .delete(authenticator, isAdmin, deleteUser)
  .get(authenticator, isAdmin, getUserById)
  .put(authenticator, isAdmin, updateUser);

export default router;
