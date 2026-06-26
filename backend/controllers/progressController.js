import Progress from "../models/Progress.js";
import Lesson from "../models/Lesson.js";
import Enrollment from "../models/Enrollment.js";

// Mark lesson complete
export const markLessonComplete = async (req, res) => {
  try {
    const { lessonId } = req.params;

    // Check if already completed
    const existing = await Progress.findOne({
      student: req.user.id,
      lesson: lessonId,
    });

    if (existing) {
      return res.status(400).json({
        message: "Lesson already completed",
      });
    }

    // Create progress record
    const progress = await Progress.create({
      student: req.user.id,
      lesson: lessonId,
      completed: true,
    });

    // Find current lesson
    const currentLesson = await Lesson.findById(lessonId);

    if (!currentLesson) {
      return res.status(404).json({
        message: "Lesson not found",
      });
    }

    // Get all lessons of this course
    const lessons = await Lesson.find({
      course: currentLesson.course,
    });

    const lessonIds = lessons.map((lesson) => lesson._id);

    // Count completed lessons
    const completedLessons = await Progress.countDocuments({
      student: req.user.id,
      lesson: { $in: lessonIds },
    });

    // Calculate percentage
    const percentage = Math.round(
      (completedLessons / lessons.length) * 100
    );

    // Update enrollment progress
    await Enrollment.findOneAndUpdate(
      {
        student: req.user.id,
        course: currentLesson.course,
      },
      {
        progress: percentage,
        completed: percentage === 100,
      }
    );

    res.status(201).json({
      success: true,
      message: "Lesson marked as complete",
      progress,
      percentage,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get progress
export const getMyProgress = async (req, res) => {
  try {
    const lessons = await Lesson.find({
      course: req.params.courseId,
    });

    const lessonIds = lessons.map(
      (lesson) => lesson._id
    );

    const completed = await Progress.find({
      student: req.user.id,
      lesson: {
        $in: lessonIds,
      },
    });

    const percentage =
      lessons.length === 0
        ? 0
        : Math.round(
            (completed.length /
              lessons.length) *
              100
          );

    res.status(200).json({
      totalLessons: lessons.length,
      completedLessons: completed.length,
      percentage,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};