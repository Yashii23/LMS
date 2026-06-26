import { useEffect, useState } from "react";
import API from "../services/api";
import { createQuestion } from "../services/questionService";
import { useNavigate } from "react-router-dom";

function AddQuestion() {
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]);

  const [formData, setFormData] = useState({
    quiz: "",
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctAnswer: "",
    marks: 5,
  });

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      const res = await API.get("/quizzes");

      setQuizzes(res.data.quizzes || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createQuestion({
        quiz: formData.quiz,
        question: formData.question,
        options: [
          formData.option1,
          formData.option2,
          formData.option3,
          formData.option4,
        ],
        correctAnswer: formData.correctAnswer,
        marks: formData.marks,
      });

      alert("Question Added Successfully");

      navigate("/quizzes");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to Add Question"
      );
    }
  };

  return (
    <div className="container">

      <h1>Add Question</h1>

      <form
        className="card"
        onSubmit={handleSubmit}
      >

        <select
          name="quiz"
          value={formData.quiz}
          onChange={handleChange}
          required
        >
          <option value="">
            Select Quiz
          </option>

          {quizzes.map((quiz) => (
            <option
              key={quiz._id}
              value={quiz._id}
            >
              {quiz.title}
            </option>
          ))}
        </select>

        <br />
        <br />

        <textarea
          rows="4"
          placeholder="Question"
          name="question"
          value={formData.question}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Option 1"
          name="option1"
          value={formData.option1}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Option 2"
          name="option2"
          value={formData.option2}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Option 3"
          name="option3"
          value={formData.option3}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Option 4"
          name="option4"
          value={formData.option4}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Correct Answer"
          name="correctAnswer"
          value={formData.correctAnswer}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="number"
          placeholder="Marks"
          name="marks"
          value={formData.marks}
          onChange={handleChange}
        />

        <br />
        <br />

        <button
          className="btn"
          type="submit"
        >
          Add Question
        </button>

      </form>

    </div>
  );
}

export default AddQuestion;