import express from "express";

import {
  createQuestion,
  getQuestionsByQuiz,
  getQuestion,
  updateQuestion,
  deleteQuestion,
} from "../controllers/questionController.js";

import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/", protect, createQuestion);


router.get("/quiz/:quizId", protect, getQuestionsByQuiz);

router.get("/:id", protect, getQuestion);

router.put("/:id", protect, updateQuestion);

router.delete("/:id", protect, deleteQuestion);

export default router;