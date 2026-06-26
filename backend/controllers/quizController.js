import Quiz from "../models/Quiz.js";
import Question from "../models/Question.js";
import QuizResult from "../models/QuizResult.js";

// =====================================
// Create Quiz
// =====================================
export const createQuiz = async (req, res) => {
  try {
    const {
      title,
      description,
      course,
      duration,
      totalMarks,
    } = req.body;

    const quiz = await Quiz.create({
      title,
      description,
      course,
      duration,
      totalMarks,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Quiz Created Successfully",
      quiz,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// Get All Quizzes
// =====================================
export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find()
      .populate("course", "title")
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(quizzes);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// Get Quiz By ID
// =====================================
export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate("course", "title")
      .populate("createdBy", "name");

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz Not Found",
      });
    }

    const questions = await Question.find({
      quiz: quiz._id,
    });

    res.status(200).json({
      quiz,
      questions,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// Add Question
// =====================================
export const addQuestion = async (req, res) => {
  try {
    const {
      quiz,
      question,
      options,
      correctAnswer,
      marks,
    } = req.body;

    const newQuestion =
      await Question.create({
        quiz,
        question,
        options,
        correctAnswer,
        marks,
      });

    res.status(201).json({
      success: true,
      question: newQuestion,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// Submit Quiz
// =====================================
export const submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    const questions = await Question.find({
      quiz: quizId,
    });

    let score = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;

    questions.forEach((question) => {
      const selected =
        answers[question._id];

      if (
        selected ===
        question.correctAnswer
      ) {
        score += question.marks;
        correctAnswers++;
      } else {
        wrongAnswers++;
      }
    });

    const totalMarks = questions.reduce(
      (sum, q) => sum + q.marks,
      0
    );

    const percentage =
      totalMarks === 0
        ? 0
        : (score / totalMarks) * 100;

    const result =
      await QuizResult.create({
        quiz: quizId,
        student: req.user.id,
        score,
        totalMarks,
        correctAnswers,
        wrongAnswers,
        percentage,
        status:
          percentage >= 40
            ? "Passed"
            : "Failed",
      });

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// Get My Results
// =====================================
export const getMyResults = async (
  req,
  res
) => {
  try {
    const results =
      await QuizResult.find({
        student: req.user.id,
      })
        .populate("quiz", "title")
        .sort({ createdAt: -1 });

    res.status(200).json(results);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};