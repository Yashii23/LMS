import express from "express";

import {
  createAssignment,
  getAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
} from "../controllers/assignmentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ===========================
// Get All Assignments
// ===========================
router.get(
  "/",
  protect,
  getAssignments
);

// ===========================
// Get Single Assignment
// ===========================
router.get(
  "/:id",
  protect,
  getAssignmentById
);

// ===========================
// Create Assignment
// ===========================
router.post(
  "/",
  protect,
  createAssignment
);

// ===========================
// Update Assignment
// ===========================
router.put(
  "/:id",
  protect,
  updateAssignment
);

// ===========================
// Delete Assignment
// ===========================
router.delete(
  "/:id",
  protect,
  deleteAssignment
);

export default router;