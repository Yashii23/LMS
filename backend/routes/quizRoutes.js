import express from "express";

import {
  createQuiz,
  getQuizzes,
  getQuizById,
  addQuestion,
  submitQuiz,
  getMyResults,
} from "../controllers/quizController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ====================================
// Quiz Routes
// ====================================

// Create Quiz
router.post(
  "/",
  protect,
  createQuiz
);

// Get All Quizzes
router.get(
  "/",
  protect,
  getQuizzes
);

// Get Quiz By ID
router.get(
  "/:id",
  protect,
  getQuizById
);

// Add Question
router.post(
  "/question",
  protect,
  addQuestion
);

// Submit Quiz
router.post(
  "/submit",
  protect,
  submitQuiz
);

// My Quiz Results
router.get(
  "/results/my",
  protect,
  getMyResults
);

export default router;