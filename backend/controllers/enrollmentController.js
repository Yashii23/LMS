import Enrollment from "../models/Enrollment.js";

// ================================
// Enroll in a Course
// ================================
export const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const exists = await Enrollment.findOne({
      student: req.user.id,
      course: courseId,
    });

    if (exists) {
      return res.status(400).json({
        message: "Already enrolled",
      });
    }

    const enrollment = await Enrollment.create({
      student: req.user.id,
      course: courseId,
    });

    res.status(201).json({
      success: true,
      enrollment,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ================================
// Get My Courses
// ================================
export const getMyCourses = async (req, res) => {
  try {
    console.log("==================================");
    console.log("Logged User:", req.user);

    const courses = await Enrollment.find({
      student: req.user.id,
    }).populate("course");

    console.log("Courses Found:", courses);
    console.log("==================================");

    res.status(200).json(courses);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};