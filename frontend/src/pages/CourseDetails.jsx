import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import { getLessons } from "../services/lessonService";
import { downloadCertificate } from "../utils/certificate";

import {
  FaBookOpen,
  FaClock,
  FaLayerGroup,
  FaPlayCircle,
  FaFileAlt,
  FaQuestionCircle,
  FaChartLine,
} from "react-icons/fa";

function CourseDetails() {

  const { id } = useParams();

  const [course, setCourse] = useState(null);

  const [lessons, setLessons] = useState([]);

  const [loading, setLoading] = useState(true);

  const [lessonLoading, setLessonLoading] =
    useState(true);

  const [error, setError] = useState("");

  const [progress] = useState(100);

  useEffect(() => {

    fetchCourse();

    fetchLessons();

  }, [id]);

  const fetchCourse = async () => {

    try {

      const res = await API.get(
        `/courses/${id}`
      );

      setCourse(
        res.data.course || res.data
      );

    } catch (err) {

      console.log(err);

      setError("Unable to load course.");

    } finally {

      setLoading(false);

    }

  };

  const fetchLessons = async () => {

    try {

      const data = await getLessons(id);

      setLessons(
        data.lessons ||
        data.data ||
        data ||
        []
      );

    } catch (err) {

      console.log(err);

    } finally {

      setLessonLoading(false);

    }

  };

  if (loading) {

    return (
      <div className="container">

        <h2>
          Loading Course...
        </h2>

      </div>
    );

  }

  if (error) {

    return (
      <div className="container">

        <h2>{error}</h2>

      </div>
    );

  }

  return (

    <div className="container">

      {/* ==========================
              Course Banner
      =========================== */}

      <div
        className="card"
        style={{
          overflow: "hidden",
          marginBottom: "35px",
        }}
      >

        <img
          src={
            course.thumbnail ||
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200"
          }
          alt={course.title}
          style={{
            width: "100%",
            height: "360px",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            padding: "30px",
          }}
        >

          <span
            style={{
              display: "inline-block",
              background: "#eef2ff",
              color: "#4f46e5",
              padding: "8px 18px",
              borderRadius: "30px",
              fontWeight: "600",
              marginBottom: "18px",
            }}
          >
            {course.category}
          </span>

          <h1>
            {course.title}
          </h1>

          <p
            style={{
              marginTop: "15px",
              lineHeight: "1.8",
            }}
          >
            {course.description}
          </p>
                    {/* ==========================
                Course Statistics
          =========================== */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(180px,1fr))",
              gap: "20px",
              marginTop: "35px",
            }}
          >

            <div className="dashboard-card">

              <FaBookOpen
                size={30}
                color="#4f46e5"
              />

              <h3>Total Lessons</h3>

              <h2>{lessons.length}</h2>

            </div>

            <div className="dashboard-card">

              <FaClock
                size={30}
                color="#16a34a"
              />

              <h3>Duration</h3>

              <h2>
                {course.duration || 0} hrs
              </h2>

            </div>

            <div className="dashboard-card">

              <FaLayerGroup
                size={30}
                color="#f59e0b"
              />

              <h3>Level</h3>

              <h2>
                {course.level || "Beginner"}
              </h2>

            </div>

            <div className="dashboard-card">

              <FaChartLine
                size={30}
                color="#ef4444"
              />

              <h3>Progress</h3>

              <h2>{progress}%</h2>

            </div>

          </div>

          {/* ==========================
                 Progress Bar
          =========================== */}

          <div
            style={{
              marginTop: "35px",
            }}
          >

            <h3>
              Course Progress
            </h3>

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
                  width: `${progress}%`,
                  height: "100%",
                  background:
                    "linear-gradient(90deg,#4f46e5,#06b6d4)",
                  transition: ".4s",
                }}
              ></div>

            </div>

            <p
              style={{
                marginTop: "12px",
                fontWeight: "600",
              }}
            >
              {progress}% Completed
            </p>

          </div>

          {/* ==========================
                 Quick Actions
          =========================== */}

          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
              marginTop: "35px",
            }}
          >

            <button className="btn">

              <FaPlayCircle
                style={{
                  marginRight: "8px",
                }}
              />

              Start Learning

            </button>

            <button className="btn-outline">

              <FaFileAlt
                style={{
                  marginRight: "8px",
                }}
              />

              Notes

            </button>

            <button className="btn-outline">

              <FaQuestionCircle
                style={{
                  marginRight: "8px",
                }}
              />

              Take Quiz

            </button>

          </div>

        </div>

      </div>

      {/* ==========================
            Lessons Section
      ========================== */}
            <div
        style={{
          marginTop: "40px",
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
            flexWrap: "wrap",
          }}
        >

          <h2>
            📚 Course Lessons
          </h2>

          <span
            style={{
              background: "#eef2ff",
              color: "#4f46e5",
              padding: "8px 18px",
              borderRadius: "30px",
              fontWeight: "600",
            }}
          >
            {lessons.length} Lessons
          </span>

        </div>

        {lessonLoading ? (

          <div className="card">

            <h3>
              Loading Lessons...
            </h3>

          </div>

        ) : lessons.length === 0 ? (

          <div className="card">

            <h3>
              No Lessons Available
            </h3>

            <p
              style={{
                marginTop: "10px",
              }}
            >
              Lessons will appear here once
              they are added.
            </p>

          </div>

        ) : (

          <div
            style={{
              display: "grid",
              gap: "20px",
            }}
          >

            {lessons.map(
              (lesson, index) => (

                <div
                  key={lesson._id}
                  className="card"
                >

                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "20px",
                    }}
                  >

                    <div
                      style={{
                        flex: 1,
                      }}
                    >

                      <span
                        style={{
                          display:
                            "inline-block",
                          background:
                            "#eef2ff",
                          color:
                            "#4f46e5",
                          padding:
                            "6px 14px",
                          borderRadius:
                            "30px",
                          fontWeight:
                            "600",
                          marginBottom:
                            "12px",
                        }}
                      >
                        Lesson {index + 1}
                      </span>

                      <h2>
                        {lesson.title}
                      </h2>

                      <p
                        style={{
                          marginTop:
                            "12px",
                        }}
                      >
                        {
                          lesson.description
                        }
                      </p>

                      <div
                        style={{
                          display:
                            "flex",
                          gap: "20px",
                          marginTop:
                            "18px",
                          flexWrap:
                            "wrap",
                        }}
                      >

                        <span>

                          ⏱️

                          {" "}

                          {
                            lesson.duration
                          }

                        </span>

                        <span>

                          🎥 Video Lesson

                        </span>

                      </div>

                    </div>

                    <Link
                      to={`/lesson/${lesson._id}`}
                    >

                      <button
                        className="btn"
                      >

                        <FaPlayCircle
                          style={{
                            marginRight:
                              "8px",
                          }}
                        />

                        Watch Lesson

                      </button>

                    </Link>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

      {/* ==========================
          Assignments & Quiz
      ========================== */}
            <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: "25px",
          marginTop: "35px",
        }}
      >

        {/* Assignment */}

        <div className="card">

          <h2>📝 Assignment</h2>

          <p
            style={{
              marginTop: "12px",
            }}
          >
            Complete your assignment after
            finishing all lessons.
          </p>

          <br />

          <Link to="/assignments">

            <button className="btn">

              View Assignments

            </button>

          </Link>

        </div>

        {/* Quiz */}

        <div className="card">

          <h2>🧠 Quiz</h2>

          <p
            style={{
              marginTop: "12px",
            }}
          >
            Test your understanding by
            attempting the course quiz.
          </p>

          <br />

          <Link to="/quizzes">

            <button className="btn">

              Start Quiz

            </button>

          </Link>

        </div>

      </div>

      {/* ==========================
              Notes
      ========================== */}

      <div
        className="card"
        style={{
          marginTop: "35px",
        }}
      >

        <h2>📄 Course Notes</h2>

        <p
          style={{
            marginTop: "12px",
          }}
        >
          Download notes, PDFs and reference
          material for this course.
        </p>

        <br />

        <button className="btn-outline">

          Download Notes

        </button>

      </div>

      {/* ==========================
            Certificate
      ========================== */}

      <div
        className="card"
        style={{
          marginTop: "35px",
          textAlign: "center",
        }}
      >

        <h2>🏆 Course Certificate</h2>

        <p
          style={{
            margin: "18px 0",
          }}
        >
          Complete all lessons and achieve
          100% progress to unlock your
          certificate.
        </p>

        <button
className="btn"
disabled={progress<100}
onClick={()=>
downloadCertificate(
JSON.parse(
localStorage.getItem("user")
)?.name || "Student",
course.title
)
}
style={{
opacity:progress<100?0.6:1,
cursor:progress<100
?"not-allowed"
:"pointer"
}}
>

🏆 Download Certificate

</button>

      </div>

    </div>

  );

}

export default CourseDetails;