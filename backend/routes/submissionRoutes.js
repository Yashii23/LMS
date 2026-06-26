import express from "express";

import {
  submitAssignment,
  getMySubmissions,
  getAllSubmissions,
  reviewSubmission,
  deleteSubmission,
} from "../controllers/submissionController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ==============================
// Student Routes
// ==============================

// Submit Assignment
router.post(
  "/submit",
  protect,
  submitAssignment
);

// Get My Submissions
router.get(
  "/my-submissions",
  protect,
  getMySubmissions
);

// ==============================
// Teacher/Admin Routes
// ==============================

// Get All Submissions
router.get(
  "/",
  protect,
  getAllSubmissions
);

// Review Submission
router.put(
  "/:id/review",
  protect,
  reviewSubmission
);

// Delete Submission
router.delete(
  "/:id",
  protect,
  deleteSubmission
);

export default router;