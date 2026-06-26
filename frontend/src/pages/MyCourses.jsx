import { useEffect, useState } from "react";
import { getMyCourses } from "../services/enrollmentService";
import { Link } from "react-router-dom";
import {
  FaBookOpen,
  FaChartLine,
  FaPlayCircle,
  FaGraduationCap,
} from "react-icons/fa";

function MyCourses() {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {

      const res = await getMyCourses();

      setCourses(
        Array.isArray(res.data)
          ? res.data
          : res.data.courses || []
      );

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
          "Failed to load courses"
      );

    } finally {

      setLoading(false);

    }
  };

  if (loading) {

    return (
      <div className="container">
        <h2>Loading Courses...</h2>
      </div>
    );

  }

  return (

    <div className="container">

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: "35px",
        }}
      >

        <div>

          <h1>My Learning</h1>

          <p>
            Continue your enrolled courses
            and track your progress.
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
          <FaGraduationCap
            size={35}
            color="#4f46e5"
          />

          <h2
            style={{
              marginTop: "10px",
            }}
          >
            {courses.length}
          </h2>

          <p>
            Enrolled Courses
          </p>

        </div>

      </div>

      {courses.length === 0 ? (

        <div
          className="card"
          style={{
            textAlign: "center",
            padding: "50px",
          }}
        >

          <h2>
            No Courses Enrolled
          </h2>

          <br />

          <p>
            Explore courses and start your
            learning journey.
          </p>

          <br />

          <Link to="/courses">

            <button className="btn">
              Browse Courses
            </button>

          </Link>

        </div>

      ) : (

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(360px,1fr))",
            gap: "25px",
          }}
        >
                    {courses.map((item) => (

            <div
              key={item._id}
              className="course-card"
            >

              <img
                src={
                  item.course?.thumbnail ||
                  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"
                }
                alt={item.course?.title}
              />

              <div className="course-content">

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
                  📘 Enrolled
                </span>

                <h2>
                  {item.course?.title}
                </h2>

                <p>
                  {item.course?.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "15px",
                    marginBottom: "15px",
                  }}
                >
                  <span>
                    <FaBookOpen />
                    {" "}
                    ₹{item.course?.price}
                  </span>

                  <span>
                    <FaChartLine />
                    {" "}
                    {item.progress || 0}%
                  </span>

                </div>

                <div
                  style={{
                    width: "100%",
                    height: "12px",
                    background: "#e5e7eb",
                    borderRadius: "20px",
                    overflow: "hidden",
                    marginBottom: "20px",
                  }}
                >

                  <div
                    style={{
                      width: `${item.progress || 0}%`,
                      height: "100%",
                      background:
                        "linear-gradient(90deg,#4f46e5,#06b6d4)",
                    }}
                  ></div>

                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                  }}
                >

                  <Link
                    to={`/courses/${item.course?._id}`}
                    style={{
                      flex: 1,
                    }}
                  >

                    <button
                      className="btn"
                      style={{
                        width: "100%",
                      }}
                    >
                      <FaPlayCircle
                        style={{
                          marginRight: "8px",
                        }}
                      />

                      Continue

                    </button>

                  </Link>

                  <Link
                    to={`/courses/${item.course?._id}`}
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
                      View Course
                    </button>

                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default MyCourses;