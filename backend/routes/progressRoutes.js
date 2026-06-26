import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  markLessonComplete,
  getMyProgress,
} from "../controllers/progressController.js";

const router = express.Router();

// Mark lesson as completed
router.post(
  "/complete/:lessonId",
  protect,
  markLessonComplete
);

// Get progress for a course
router.get(
  "/my-progress/:courseId",
  protect,
  getMyProgress
);

export default router;