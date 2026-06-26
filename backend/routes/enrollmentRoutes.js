import express from "express";

import {
  enrollCourse,
  getMyCourses,
} from "../controllers/enrollmentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/enroll",
  protect,
  enrollCourse
);

router.get(
  "/my-courses",
  protect,
  getMyCourses
);

export default router;