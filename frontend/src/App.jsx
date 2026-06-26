import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import MyCourses from "./pages/MyCourses";
import Profile from "./pages/Profile";
import CourseDetails from "./pages/CourseDetails";
import LessonPlayer from "./pages/LessonPlayer";
import AddLesson from "./pages/AddLesson";
import AssignmentDetails from "./pages/AssignmentDetails";
import Assignments from "./pages/Assignments";
import Quizzes from "./pages/Quizzes";
import QuizPlayer from "./pages/QuizPlayer";
import QuizResult from "./pages/QuizResult";
import AddQuestion from "./pages/AddQuestion";

function App() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Quiz */}

      <Route
        path="/quizzes"
        element={
          <ProtectedRoute>
            <Layout>
              <Quizzes />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-question"
        element={
          <ProtectedRoute>
            <Layout>
              <AddQuestion />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/quiz/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <QuizPlayer />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/quiz-result"
        element={
          <ProtectedRoute>
            <Layout>
              <QuizResult />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Dashboard */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Assignments */}

      <Route
        path="/assignments"
        element={
          <ProtectedRoute>
            <Layout>
              <Assignments />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/assignments/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <AssignmentDetails />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Courses */}

      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <Layout>
              <Courses />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/courses/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <CourseDetails />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/lesson/:lessonId"
        element={
          <ProtectedRoute>
            <Layout>
              <LessonPlayer />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-courses"
        element={
          <ProtectedRoute>
            <Layout>
              <MyCourses />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-lesson"
        element={
          <ProtectedRoute>
            <Layout>
              <AddLesson />
            </Layout>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;