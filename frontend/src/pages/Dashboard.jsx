import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import {
  FaBook,
  FaGraduationCap,
  FaChartLine,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

function Dashboard() {

  const [stats, setStats] = useState({
    totalCourses: 0,
    enrolledCourses: 0,
    completedCourses: 0,
    completedLessons: 0,
    progress: 0,
  });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      const [dashboardRes, coursesRes] =
        await Promise.all([
          API.get("/dashboard/stats"),
          API.get("/enrollments/my-courses"),
        ]);

      setStats({
        totalCourses:
          dashboardRes.data.totalCourses || 0,

        enrolledCourses:
          dashboardRes.data.enrolledCourses || 0,

        completedCourses:
          dashboardRes.data.completedCourses || 0,

        completedLessons:
          dashboardRes.data.completedLessons || 0,

        progress:
          dashboardRes.data.progress || 0,
      });

      setCourses(coursesRes.data || []);

    } catch (err) {
      console.log(err);
    }
  };

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="container">

      {/* =======================
            Welcome Banner
      ======================= */}

      <div
        className="card"
        style={{
          marginBottom: "30px",
          background:
            "linear-gradient(135deg,#4f46e5,#6366f1)",
          color: "#fff",
        }}
      >
        <h1
          style={{
            color: "#fff",
            marginBottom: "10px",
          }}
        >
          Welcome Back,
          {" "}
          {user?.name || "Student"} 👋
        </h1>

        <p
          style={{
            color: "#f1f5f9",
          }}
        >
          Continue learning and improve your
          programming skills every day.
        </p>
      </div>

      {/* =======================
            Statistics
      ======================= */}

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <FaBook
            size={35}
            color="#4f46e5"
          />

          <h3>Total Courses</h3>

          <h1>{stats.totalCourses}</h1>
        </div>

        <div className="dashboard-card">
          <FaGraduationCap
            size={35}
            color="#16a34a"
          />

          <h3>Enrolled Courses</h3>

          <h1>{stats.enrolledCourses}</h1>
        </div>

        <div className="dashboard-card">
          <FaCheckCircle
            size={35}
            color="#f59e0b"
          />

          <h3>Completed Lessons</h3>

          <h1>{stats.completedLessons}</h1>
        </div>

        <div className="dashboard-card">
          <FaChartLine
            size={35}
            color="#dc2626"
          />

          <h3>Overall Progress</h3>

          <h1>{stats.progress}%</h1>
        </div>

      </div>

      {/* =======================
          Progress Card
      ======================= */}

      <div
        className="card"
        style={{
          marginTop: "35px",
          marginBottom: "35px",
        }}
      >
        <h2>Your Learning Progress</h2>

        <br />

        <div
          style={{
            width: "100%",
            height: "16px",
            background: "#e5e7eb",
            borderRadius: "30px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${stats.progress}%`,
              height: "100%",
              background:
                "linear-gradient(90deg,#4f46e5,#06b6d4)",
              transition: "0.4s",
            }}
          ></div>
        </div>

        <p
          style={{
            marginTop: "15px",
            fontWeight: "600",
          }}
        >
          {stats.progress}% Completed
        </p>
      </div>
            {/* =======================
          Continue Learning
      ======================= */}

      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        Continue Learning
      </h2>

      {courses.length === 0 ? (

        <div className="card">
          <h3>No Enrolled Courses</h3>

          <p>
            Enroll in a course to start your
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

        courses.map((item) => (

          <div
            key={item._id}
            className="card"
            style={{
              marginBottom: "25px",
            }}
          >

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >

              <div>

                <h2>
                  {item.course?.title}
                </h2>

                <p>
                  {item.course?.description}
                </p>

                <br />

                <strong>
                  Progress :
                  {" "}
                  {item.progress || 0}%
                </strong>

                <div
                  style={{
                    width: "350px",
                    height: "12px",
                    background: "#e5e7eb",
                    borderRadius: "20px",
                    overflow: "hidden",
                    marginTop: "12px",
                  }}
                >
                  <div
                    style={{
                      width: `${item.progress || 0}%`,
                      height: "100%",
                      background:
                        "#4f46e5",
                    }}
                  ></div>
                </div>

              </div>

              <Link
                to={`/courses/${item.course?._id}`}
              >
                <button className="btn">

                  Continue

                  <FaArrowRight
                    style={{
                      marginLeft: "8px",
                    }}
                  />

                </button>
              </Link>

            </div>

          </div>

        ))

      )}

      {/* =======================
            Recent Activity
      ======================= */}

      <div
        className="card"
        style={{
          marginTop: "35px",
        }}
      >

        <h2>
          Recent Activity
        </h2>

        <br />

        <ul
          style={{
            lineHeight: "2",
            paddingLeft: "20px",
          }}
        >
          <li>
            📘 Continue your enrolled
            courses.
          </li>

          <li>
            📝 Attempt quizzes after
            completing lessons.
          </li>

          <li>
            📂 Submit assignments before
            the due date.
          </li>

          <li>
            🏆 Reach 100% progress to
            complete your course.
          </li>
        </ul>

      </div>

      {/* =======================
            Quick Actions
      ======================= */}

      <div
        className="dashboard-grid"
        style={{
          marginTop: "35px",
        }}
      >

        <Link
          to="/courses"
          style={{
            textDecoration: "none",
          }}
        >
          <div className="dashboard-card">

            <h2>📚</h2>

            <h3>Explore Courses</h3>

          </div>
        </Link>

        <Link
          to="/my-courses"
          style={{
            textDecoration: "none",
          }}
        >
          <div className="dashboard-card">

            <h2>🎓</h2>

            <h3>My Courses</h3>

          </div>
        </Link>

        <Link
          to="/assignments"
          style={{
            textDecoration: "none",
          }}
        >
          <div className="dashboard-card">

            <h2>📝</h2>

            <h3>Assignments</h3>

          </div>
        </Link>

        <Link
          to="/quizzes"
          style={{
            textDecoration: "none",
          }}
        >
          <div className="dashboard-card">

            <h2>🧠</h2>

            <h3>Take Quiz</h3>

          </div>
        </Link>

      </div>

    </div>
  );
}

export default Dashboard;