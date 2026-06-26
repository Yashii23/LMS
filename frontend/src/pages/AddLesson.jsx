import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

function AddLesson() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);

  const [form, setForm] = useState({
    course: "",
    title: "",
    description: "",
    videoUrl: "",
    duration: "",
    order: 1,
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");

      console.log("Courses Response:", res.data);

      // Handles both possible API responses
      if (Array.isArray(res.data)) {
        setCourses(res.data);
      } else if (Array.isArray(res.data.courses)) {
        setCourses(res.data.courses);
      } else {
        setCourses([]);
      }
    } catch (err) {
      console.log(err);
      setCourses([]);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "order"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/lessons", form);

      toast.success("Lesson Added");

      navigate("/courses");
    } catch (err) {
      console.log(err);

      toast.error("Failed to Add Lesson");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Add Lesson</h1>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Select Course</label>

            <select
              name="course"
              value={form.course}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Course
              </option>

              {(courses || []).map((course) => (
                <option
                  key={course._id}
                  value={course._id}
                >
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Lesson Title</label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Lesson Title"
              required
            />
          </div>

          <div className="form-group">
            <label>Description / Notes</label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="5"
              placeholder="Lesson Notes"
            />
          </div>

          <div className="form-group">
            <label>YouTube Video URL</label>

            <input
              type="text"
              name="videoUrl"
              value={form.videoUrl}
              onChange={handleChange}
              placeholder="https://youtube.com/..."
              required
            />
          </div>

          <div className="form-group">
            <label>Duration</label>

            <input
              type="text"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              placeholder="30 Minutes"
            />
          </div>

          <div className="form-group">
            <label>Lesson Order</label>

            <input
              type="number"
              name="order"
              value={form.order}
              onChange={handleChange}
              min="1"
            />
          </div>

          <button
            type="submit"
            className="btn"
          >
            Add Lesson
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddLesson;