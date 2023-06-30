import express from "express";
import {
  getTests,
  getTest,
  deleteTest,
  updateTest,
  createTest,
  createTestReview,
  getTopRatedTests,
  getFeaturedTests,
  enrollTest,
} from "../controllers/testController.js";
import { authenticator, isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(getTests).post(authenticator, isAdmin, createTest);
router.route("/:id/review").post(authenticator, createTestReview);
router.route("/:id/enroll").put(authenticator, enrollTest);
router.route("/top").get(getTopRatedTests);
router.route("/featured").get(getFeaturedTests);
router
  .route("/:id")
  .get(getTest)
  .delete(authenticator, isAdmin, deleteTest)
  .put(authenticator, isAdmin, updateTest);

export default router;
