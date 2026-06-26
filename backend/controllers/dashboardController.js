import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import Progress from "../models/Progress.js";

export const getStats = async (req, res) => {
  try {
    const totalCourses = await Course.countDocuments();

    const enrolledCourses = await Enrollment.countDocuments({
      student: req.user.id,
    });

    const completedCourses = await Enrollment.countDocuments({
      student: req.user.id,
      completed: true,
    });

    const completedLessons = await Progress.countDocuments({
      student: req.user.id,
      completed: true,
    });

    const progress =
      enrolledCourses === 0
        ? 0
        : Math.round(
            (completedCourses / enrolledCourses) * 100
          );

    res.status(200).json({
      totalCourses,
      enrolledCourses,
      completedCourses,
      completedLessons,
      progress,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};