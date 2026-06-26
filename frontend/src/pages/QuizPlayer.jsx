import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

function QuizPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] = useState({});

  const [timeLeft, setTimeLeft] =
    useState(0);

  useEffect(() => {
    loadQuiz();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && questions.length) {
      submitQuiz();
    }
  }, [timeLeft]);

const loadQuiz = async () => {
  try {
    // Get quiz details
    const quizRes = await API.get(`/quizzes/${id}`);

    setQuiz(quizRes.data.quiz);

    setTimeLeft(quizRes.data.quiz.duration * 60);

    // Get questions for this quiz
    const questionRes = await API.get(
      `/questions/quiz/${id}`
    );

    setQuestions(questionRes.data.questions);

  } catch (error) {
    console.log(error);
  }
};

  const handleAnswer = (
    questionId,
    option
  ) => {
    setAnswers({
      ...answers,
      [questionId]: option,
    });
  };

  const nextQuestion = () => {
    if (
      currentQuestion <
      questions.length - 1
    ) {
      setCurrentQuestion(
        currentQuestion + 1
      );
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(
        currentQuestion - 1
      );
    }
  };

  const submitQuiz = async () => {
    try {
      const res = await API.post(
        "/quizzes/submit",
        {
          quizId: id,
          answers,
        }
      );

      toast.success("Quiz Submitted Successfully");

      navigate("/quiz-result", {
        state: res.data.result,
      });

    } catch (error) {
      toast.error(
  error.response?.data?.message ||
  "Quiz Submission Failed"
);
    }
  };

  const formatTime = () => {
    const minutes = Math.floor(
      timeLeft / 60
    );

    const seconds = timeLeft % 60;

    return `${minutes}:${
      seconds < 10
        ? "0" + seconds
        : seconds
    }`;
  };

  if (!questions.length)
    return (
      <div className="container">
        <h2>Loading Quiz...</h2>
      </div>
    );

  const question =
    questions[currentQuestion];

  return (
    <div className="container">

      <div
        className="card"
        style={{
          marginBottom: "20px",
        }}
      >

        <h1>{quiz.title}</h1>

        <p>{quiz.description}</p>

        <h3
          style={{
            color: "red",
          }}
        >
          Time Left :
          {" "}
          {formatTime()}
        </h3>

        <hr />

        <h2>
          Question{" "}
          {currentQuestion + 1}
          {" / "}
          {questions.length}
        </h2>

        <h3>
          {question.question}
        </h3>

        <br />
                <div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "20px",
  }}
>
  {question.options.map((option, index) => (
    <div
      key={index}
      style={{
        marginBottom: "10px",
      }}
    >
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          cursor: "pointer",
          fontSize: "18px",
          width: "100%",
          padding: "14px 18px",
          border: "2px solid #e5e7eb",
          borderRadius: "10px",
          background: "#fff",
          transition: "0.3s",
        }}
      >
        <input
          type="radio"
          name={question._id}
          value={option}
          checked={answers[question._id] === option}
          onChange={() =>
            handleAnswer(question._id, option)
          }
          style={{
            width: "18px",
            height: "18px",
            cursor: "pointer",
            flexShrink: 0,
          }}
        />

        <span>{option}</span>
      </label>
    </div>
  ))}
</div>

        <br />

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            marginTop: "30px",
          }}
        >
          <button
            className="btn"
            onClick={previousQuestion}
            disabled={
              currentQuestion === 0
            }
          >
            Previous
          </button>

          {currentQuestion ===
          questions.length - 1 ? (
            <button
              className="btn"
              onClick={submitQuiz}
              style={{
                background:
                  "#16a34a",
              }}
            >
              Submit Quiz
            </button>
          ) : (
            <button
              className="btn"
              onClick={nextQuestion}
            >
              Next
            </button>
          )}
        </div>

        <br />

        <div
          style={{
            width: "100%",
            height: "12px",
            background:
              "#e5e7eb",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${
                ((currentQuestion + 1) /
                  questions.length) *
                100
              }%`,
              height: "100%",
              background:
                "#4f46e5",
              transition:
                "0.3s",
            }}
          ></div>
        </div>

        <p
          style={{
            marginTop: "15px",
          }}
        >
          Progress :
          {" "}
          {currentQuestion + 1}
          {" / "}
          {questions.length}
        </p>

      </div>

    </div>
  );
}

export default QuizPlayer;