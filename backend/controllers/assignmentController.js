import Assignment from "../models/Assignment.js";

// ===========================
// Create Assignment
// ===========================
export const createAssignment = async (req, res) => {
  try {
    const {
      title,
      description,
      course,
      dueDate,
      maxMarks,
    } = req.body;

    const assignment = await Assignment.create({
      title,
      description,
      course,
      dueDate,
      maxMarks,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Assignment Created Successfully",
      assignment,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ===========================
// Get All Assignments
// ===========================
export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate("course", "title")
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(assignments);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ===========================
// Get Assignment By ID
// ===========================
export const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(
      req.params.id
    )
      .populate("course", "title")
      .populate("createdBy", "name");

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment Not Found",
      });
    }

    res.status(200).json(assignment);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ===========================
// Update Assignment
// ===========================
export const updateAssignment = async (req, res) => {
  try {
    const assignment =
      await Assignment.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Assignment Updated",
      assignment,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ===========================
// Delete Assignment
// ===========================
export const deleteAssignment = async (
  req,
  res
) => {
  try {
    const assignment =
      await Assignment.findByIdAndDelete(
        req.params.id
      );

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Assignment Deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};