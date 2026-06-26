import { useEffect, useState } from "react";
import {
  getAssignments,
  deleteAssignment,
  createAssignment,
} from "../services/assignmentService";
import API from "../services/api";
import { Link } from "react-router-dom";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    course: "",
    dueDate: "",
    maxMarks: 100,
  });

  useEffect(() => {
    fetchAssignments();
    fetchCourses();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await getAssignments();
      setAssignments(res.data);
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

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await createAssignment(formData);

      alert("Assignment Created Successfully");

      setShowForm(false);

      setFormData({
        title: "",
        description: "",
        course: "",
        dueDate: "",
        maxMarks: 100,
      });

      fetchAssignments();

    } catch (error) {

      alert(
        error.response?.data?.message ||
          "Failed to create assignment"
      );

    }
  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete Assignment?"))
      return;

    try {

      await deleteAssignment(id);

      fetchAssignments();

    } catch (error) {

      console.log(error);

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

        <h1>Assignments</h1>

        <button
          className="btn"
          onClick={() =>
            setShowForm(!showForm)
          }
        >
          {showForm
            ? "Close"
            : "Create Assignment"}
        </button>

      </div>

      {showForm && (

        <form
          className="card"
          onSubmit={handleCreate}
          style={{
            marginBottom: "30px",
          }}
        >

          <input
            type="text"
            placeholder="Assignment Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <textarea
            placeholder="Description"
            rows="5"
            name="description"
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
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <input
            type="number"
            name="maxMarks"
            placeholder="Maximum Marks"
            value={formData.maxMarks}
            onChange={handleChange}
          />

          <br />
          <br />

          <button
            className="btn"
            type="submit"
          >
            Save Assignment
          </button>

        </form>

      )}

      {assignments.length === 0 ? (

        <h2>No Assignments Found</h2>

      ) : (

        assignments.map((assignment) => (
                      <div
            key={assignment._id}
            className="card"
            style={{
              marginBottom: "20px",
            }}
          >

            <h2>{assignment.title}</h2>

            <p>{assignment.description}</p>

            <br />

            <p>
              <strong>Course :</strong>{" "}
              {assignment.course?.title}
            </p>
            <p>
  <strong>Status:</strong>{" "}
  <span
    style={{
      color:
        assignment.status === "Pending"
          ? "orange"
          : assignment.status === "Submitted"
          ? "#3b82f6"
          : "green",
      fontWeight: "bold",
    }}
  >
    {assignment.status || "Pending"}
  </span>
</p>

            <p>
              <strong>Due Date :</strong>{" "}
              {new Date(
                assignment.dueDate
              ).toLocaleDateString()}
            </p>

            <p>
              <strong>Maximum Marks :</strong>{" "}
              {assignment.maxMarks}
            </p>

            <p>
              <strong>Created By :</strong>{" "}
              {assignment.createdBy?.name}
            </p>

            <div
              style={{
                display: "flex",
                gap: "15px",
                marginTop: "20px",
              }}
            >

              <Link
                to={`/assignments/${assignment._id}`}
              >
                <button
className="btn"
style={{
background:"#4f46e5"
}}
>
📄 View
</button>
              </Link>

              <button
className="btn"
style={{
background:"#dc2626"
}}
>
🗑 Delete
</button>

            </div>

          </div>

        ))

      )}

    </div>

  );
}

export default Assignments;