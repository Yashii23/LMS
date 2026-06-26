import mongoose from "mongoose";

const quizResultSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    score: {
      type: Number,
      default: 0,
    },

    totalMarks: {
      type: Number,
      required: true,
    },

    correctAnswers: {
      type: Number,
      default: 0,
    },

    wrongAnswers: {
      type: Number,
      default: 0,
    },

    percentage: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Passed", "Failed"],
      default: "Failed",
    },
  },
  {
    timestamps: true,
  }
);

const QuizResult = mongoose.model(
  "QuizResult",
  quizResultSchema
);

export default QuizResult;