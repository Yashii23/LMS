import { Link, useLocation } from "react-router-dom";

function QuizResult() {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="container">
        <h1>Quiz Result</h1>

        <div className="card">
          <h2>No Quiz Result Found</h2>

          <br />

          <Link to="/quizzes">
            <button className="btn">
              Back to Quizzes
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">

      <div
        className="card"
        style={{
          maxWidth: "700px",
          margin: "40px auto",
          padding: "40px",
          textAlign: "center",
        }}
      >

        <h1>Quiz Completed 🎉</h1>

        <br />

        <h2
          style={{
            color:
              state.status === "Passed"
                ? "#22c55e"
                : "#ef4444",
          }}
        >
          {state.status}
        </h2>

        <br />

        <h1
          style={{
            fontSize: "55px",
          }}
        >
          {state.score} / {state.totalMarks}
        </h1>

        <br />

        <p>
          <strong>Percentage :</strong>{" "}
          {Number(state.percentage).toFixed(2)}%
        </p>

        <br />

        <p>
          <strong>Correct Answers :</strong>{" "}
          {state.correctAnswers}
        </p>

        <p>
          <strong>Wrong Answers :</strong>{" "}
          {state.wrongAnswers}
        </p>

        <br />

        <div
          style={{
            width: "100%",
            height: "18px",
            background: "#ddd",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${state.percentage}%`,
              height: "100%",
              background:
                state.status === "Passed"
                  ? "#22c55e"
                  : "#ef4444",
            }}
          ></div>
        </div>

        <br />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "25px",
          }}
        >

          <Link to="/quizzes">
            <button className="btn">
              Take Another Quiz
            </button>
          </Link>

          <Link to="/dashboard">
            <button className="btn">
              Dashboard
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default QuizResult;