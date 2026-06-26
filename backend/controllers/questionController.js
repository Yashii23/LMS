import Question from "../models/Question.js";

// =============================
// Create Question
// =============================
export const createQuestion = async (req, res) => {
  try {
    const {
      quiz,
      question,
      options,
      correctAnswer,
      marks,
    } = req.body;

    const newQuestion = await Question.create({
      quiz,
      question,
      options,
      correctAnswer,
      marks,
    });

    res.status(201).json({
      success: true,
      message: "Question Added Successfully",
      question: newQuestion,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Get Questions By Quiz
// =============================
export const getQuestionsByQuiz = async (req, res) => {
  try {
    const questions = await Question.find({
      quiz: req.params.quizId,
    });

    res.status(200).json({
      success: true,
      count: questions.length,
      questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Get Single Question
// =============================
export const getQuestion = async (req, res) => {
  try {
    const question = await Question.findById(
      req.params.id
    );

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question Not Found",
      });
    }

    res.status(200).json({
      success: true,
      question,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Update Question
// =============================
export const updateQuestion = async (req, res) => {
  try {
    const question =
      await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question Not Found",
      });
    }

    const updatedQuestion =
      await Question.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      success: true,
      message: "Question Updated Successfully",
      question: updatedQuestion,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Delete Question
// =============================
export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(
      req.params.id
    );

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question Not Found",
      });
    }

    await question.deleteOne();

    res.status(200).json({
      success: true,
      message: "Question Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};