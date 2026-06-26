import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <section className="hero">

        <div className="hero-left">

          <span className="badge">
            🚀 Learn • Build • Get Certified
          </span>

          <h1>
            Learn Without
            <span className="gradient"> Limits</span>
          </h1>

          <p>
            A modern Learning Management System where students
            can learn industry-ready skills, complete quizzes,
            submit assignments, track progress and earn
            certificates.
          </p>

          <div className="hero-buttons">

            <Link to="/courses">
              <button className="btn">
                Browse Courses
              </button>
            </Link>

            <Link to="/register">
              <button className="btn-outline">
                Get Started
              </button>
            </Link>

          </div>

          <div className="stats">

            <div className="stat">
              <h2>20+</h2>
              <p>Courses</p>
            </div>

            <div className="stat">
              <h2>100+</h2>
              <p>Students</p>
            </div>

            <div className="stat">
              <h2>15+</h2>
              <p>Projects</p>
            </div>

          </div>

        </div>

        <div className="hero-right">

          <div className="hero-card">

            <h3>🔥 Trending Course</h3>

            <h2>MERN Stack Development</h2>

            <p>
              Build Full Stack Applications using
              MongoDB, Express, React and Node.js.
            </p>

            <button className="btn">
              Enroll Now
            </button>

          </div>

        </div>

      </section>

      <section className="features">

        <h1>Why Choose LMS Pro?</h1>

        <div className="feature-grid">

          <div className="feature-card">
            <h2>📚</h2>
            <h3>Premium Courses</h3>
            <p>
              Learn from industry-level content.
            </p>
          </div>

          <div className="feature-card">
            <h2>📝</h2>
            <h3>Assignments</h3>
            <p>
              Submit assignments online.
            </p>
          </div>

          <div className="feature-card">
            <h2>❓</h2>
            <h3>Interactive Quiz</h3>
            <p>
              Practice with quizzes.
            </p>
          </div>

          <div className="feature-card">
            <h2>🏆</h2>
            <h3>Certificates</h3>
            <p>
              Earn certificates after completion.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;