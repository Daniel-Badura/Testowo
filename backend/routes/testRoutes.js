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
  checkTestAnswers,
  submitTestAnswers,
} from "../controllers/testController.js";
import {
  getQuestion,
  deleteQuestion,
  updateQuestion,
  createQuestion,
  getQuestions,
  createAnswer,
  deleteAnswer,
  getTestQuestions,
} from "../controllers/questionController.js";
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
router.route("/:id/test").get(authenticator, getTestQuestions);
router.route("/:id/test/submit").put(authenticator, submitTestAnswers);
router.route("/:id/test/check").put(authenticator, checkTestAnswers);

router
  .route("/:id/questions")
  .get(getQuestions)
  .post(authenticator, createQuestion);
router
  .route("/:id/questions/:qid")
  .get(getQuestion)
  .delete(authenticator, isAdmin, deleteQuestion)
  .put(authenticator, isAdmin, updateQuestion)
  .post(authenticator, isAdmin, createAnswer);
router
  .route("/:id/questions/:qid/:aid")
  .delete(authenticator, isAdmin, deleteAnswer);

export default router;
