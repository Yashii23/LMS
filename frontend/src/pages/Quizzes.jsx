import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);

  const [courses, setCourses] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    course: "",
    duration: 30,
    totalMarks: 100,
  });

  useEffect(() => {
    fetchQuizzes();
    fetchCourses();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await API.get("/quizzes");
      setQuizzes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data.courses);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createQuiz = async (e) => {
    e.preventDefault();

    try {
      await API.post("/quizzes", formData);

      alert("Quiz Created Successfully");

      setShowForm(false);

      setFormData({
        title: "",
        description: "",
        course: "",
        duration: 30,
        totalMarks: 100,
      });

      fetchQuizzes();

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to create quiz"
      );
    }
  };

  return (
    <div className="container">

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1>Quiz Module</h1>

        <button
          className="btn"
          onClick={() =>
            setShowForm(!showForm)
          }
        >
          {showForm
            ? "Close"
            : "Create Quiz"}
        </button>

      </div>

      {showForm && (

        <form
          className="card"
          onSubmit={createQuiz}
          style={{
            marginBottom: "30px",
          }}
        >

          <input
            type="text"
            name="title"
            placeholder="Quiz Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <textarea
            rows="4"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Course
            </option>

            {courses.map((course) => (
              <option
                key={course._id}
                value={course._id}
              >
                {course.title}
              </option>
            ))}
          </select>

          <br />
          <br />

          <input
            type="number"
            name="duration"
            placeholder="Duration (Minutes)"
            value={formData.duration}
            onChange={handleChange}
          />

          <br />
          <br />

          <input
            type="number"
            name="totalMarks"
            placeholder="Total Marks"
            value={formData.totalMarks}
            onChange={handleChange}
          />

          <br />
          <br />

          <button
            className="btn"
            type="submit"
          >
            Save Quiz
          </button>

        </form>

      )}

      {quizzes.length === 0 ? (

        <h2>No Quiz Available</h2>

      ) : (

        quizzes.map((quiz) => (

          <div
            key={quiz._id}
            className="card"
            style={{
              marginBottom: "20px",
            }}
          >

            <h2>{quiz.title}</h2>

            <p>{quiz.description}</p>

            <p>

              <strong>Course :</strong>{" "}

              {quiz.course?.title}

            </p>

            <p>

              <strong>Duration :</strong>{" "}

              {quiz.duration} Minutes

            </p>

            <p>

              <strong>Total Marks :</strong>{" "}

              {quiz.totalMarks}

            </p>

            <div
              style={{
                display: "flex",
                gap: "15px",
                marginTop: "20px",
              }}
            >

              <Link
                to={`/quiz/${quiz._id}`}
              >
                <button className="btn">
                  Start Quiz
                </button>
              </Link>

            </div>

          </div>

        ))

      )}

    </div>
  );
}

export default Quizzes;