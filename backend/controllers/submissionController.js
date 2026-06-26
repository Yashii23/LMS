import Submission from "../models/Submission.js";
import Assignment from "../models/Assignment.js";

// ======================================
// Submit Assignment
// ======================================
export const submitAssignment = async (req, res) => {
  try {
    const { assignmentId, fileUrl } = req.body;

    const assignment = await Assignment.findById(
      assignmentId
    );

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    const alreadySubmitted =
      await Submission.findOne({
        assignment: assignmentId,
        student: req.user.id,
      });

    if (alreadySubmitted) {
      return res.status(400).json({
        message: "Assignment already submitted",
      });
    }

    const submission = await Submission.create({
      assignment: assignmentId,
      student: req.user.id,
      fileUrl,
      status: "Submitted",
    });

    res.status(201).json({
      success: true,
      message: "Assignment submitted successfully",
      submission,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================
// Get My Submissions
// ======================================
export const getMySubmissions = async (
  req,
  res
) => {
  try {
    const submissions =
      await Submission.find({
        student: req.user.id,
      })
        .populate(
          "assignment",
          "title dueDate maxMarks"
        )
        .sort({ createdAt: -1 });

    res.status(200).json(submissions);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================
// Get All Submissions (Teacher/Admin)
// ======================================
export const getAllSubmissions =
  async (req, res) => {
    try {
      const submissions =
        await Submission.find()
          .populate(
            "student",
            "name email"
          )
          .populate(
            "assignment",
            "title"
          )
          .sort({ createdAt: -1 });

      res.status(200).json(submissions);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: error.message,
      });
    }
  };

// ======================================
// Review Submission
// ======================================
export const reviewSubmission =
  async (req, res) => {
    try {
      const { marks, feedback } =
        req.body;

      const submission =
        await Submission.findById(
          req.params.id
        );

      if (!submission) {
        return res.status(404).json({
          message:
            "Submission not found",
        });
      }

      submission.marks = marks;

      submission.feedback =
        feedback;

      submission.status =
        "Reviewed";

      await submission.save();

      res.status(200).json({
        success: true,
        message:
          "Submission reviewed successfully",
        submission,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: error.message,
      });
    }
  };

// ======================================
// Delete Submission
// ======================================
export const deleteSubmission =
  async (req, res) => {
    try {
      const submission =
        await Submission.findByIdAndDelete(
          req.params.id
        );

      if (!submission) {
        return res.status(404).json({
          message:
            "Submission not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Submission deleted successfully",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: error.message,
      });
    }
  };