import { useEffect, useState } from "react";
import API from "../services/api";
import { enrollCourse } from "../services/enrollmentService";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  FaSearch,
  FaStar,
  FaClock,
  FaLayerGroup,
} from "react-icons/fa";

function Courses() {

  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {

      const res = await API.get("/courses");

      setCourses(
        Array.isArray(res.data)
          ? res.data
          : res.data.courses || []
      );

    } catch (err) {
      console.log(err);
    }
  };

  const handleEnroll = async (courseId) => {
    try {

      await enrollCourse(courseId);

      toast.success("Course Enrolled Successfully");

    } catch (err) {

      toast.error(
err.response?.data?.message ||
"Enrollment Failed"
);

    }
  };

  const filteredCourses = courses.filter((course) => {

    const matchSearch =
      course.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchCategory =
      category === "All" ||
      course.category === category;

    return matchSearch && matchCategory;

  });

  return (

    <div className="container">

      {/* =======================
              Header
      ======================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: "35px",
          gap: "20px",
        }}
      >

        <div>

          <h1>Explore Courses</h1>

          <p>
            Upgrade your skills with our
            premium learning content.
          </p>

        </div>

        <div
          className="card"
          style={{
            padding: "20px",
            minWidth: "180px",
            textAlign: "center",
          }}
        >

          <h2
            style={{
              color: "#4f46e5",
            }}
          >
            {courses.length}
          </h2>

          <p>Total Courses</p>

        </div>

      </div>

      {/* =======================
         Search + Filter
      ======================= */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "35px",
          flexWrap: "wrap",
        }}
      >

        <div
          style={{
            position: "relative",
            flex: 1,
            minWidth: "280px",
          }}
        >

          <FaSearch
            style={{
              position: "absolute",
              top: "18px",
              left: "18px",
              color: "#9ca3af",
            }}
          />

          <input
            type="text"
            placeholder="Search Courses..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              paddingLeft: "50px",
            }}
          />

        </div>

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          style={{
            maxWidth: "250px",
          }}
        >

          <option value="All">
            All Categories
          </option>

          <option value="Programming">
            Programming
          </option>

          <option value="Frontend">
            Frontend
          </option>

          <option value="Backend">
            Backend
          </option>

          <option value="Web Development">
            Web Development
          </option>

        </select>

      </div>

      {/* =======================
            Course Grid
      ======================= */}

      <div className="course-grid">
                {filteredCourses.length === 0 ? (

          <div
            className="card"
            style={{
              width: "100%",
              textAlign: "center",
              padding: "60px",
            }}
          >

            <h2>No Courses Found</h2>

            <p>
              Try searching with another keyword.
            </p>

          </div>

        ) : (

          filteredCourses.map((course) => (

            <div
              key={course._id}
              className="course-card"
            >

              <img
                src={
                  course.thumbnail ||
                  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900"
                }
                alt={course.title}
              />

              <div className="course-content">

                {/* Category */}

                <span
                  style={{
                    display: "inline-block",
                    background: "#eef2ff",
                    color: "#4f46e5",
                    padding: "6px 14px",
                    borderRadius: "30px",
                    fontWeight: "600",
                    marginBottom: "15px",
                  }}
                >
                  {course.category}
                </span>

                <h2>
                  {course.title}
                </h2>

                <p>
                  {course.description}
                </p>

                {/* Rating */}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    margin: "15px 0",
                    color: "#f59e0b",
                    fontWeight: "600",
                  }}
                >
                  <FaStar />

                  {course.rating || 4.8}

                  <span
                    style={{
                      color: "#6b7280",
                    }}
                  >
                    ({course.totalRatings || 120})
                  </span>

                </div>

                {/* Meta */}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                    color: "#6b7280",
                    fontSize: "15px",
                  }}
                >

                  <span>

                    <FaClock />

                    {" "}

                    {course.duration || 20} hrs

                  </span>

                  <span>

                    <FaLayerGroup />

                    {" "}

                    {course.level}

                  </span>

                </div>

                {/* Price */}

                <h2
                  style={{
                    color: "#4f46e5",
                    marginBottom: "20px",
                  }}
                >
                  ₹ {course.price}
                </h2>

                {/* Buttons */}

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                  }}
                >

                  <button
                    className="btn"
                    style={{
                      flex: 1,
                    }}
                    onClick={() =>
                      handleEnroll(course._id)
                    }
                  >
                    Enroll
                  </button>

                  <Link
                    to={`/courses/${course._id}`}
                    style={{
                      flex: 1,
                    }}
                  >

                    <button
                      className="btn-outline"
                      style={{
                        width: "100%",
                      }}
                    >
                      View Details
                    </button>

                  </Link>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default Courses;