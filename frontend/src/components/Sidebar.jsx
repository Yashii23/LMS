import {
  FaBook,
  FaHome,
  FaUserGraduate,
  FaUser,
  FaClipboardList,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <div className="sidebar">
      <h2>LMS Pro</h2>

      <NavLink to="/dashboard">
        <FaHome /> Dashboard
      </NavLink>

      <NavLink to="/courses">
        <FaBook /> Courses
      </NavLink>

      <NavLink to="/my-courses">
        <FaUserGraduate /> My Courses
      </NavLink>

      <NavLink to="/profile">
        <FaUser /> Profile
      </NavLink>

      <NavLink to="/assignments">
        <FaClipboardList /> Assignments
      </NavLink>

      <NavLink to="/quizzes">
  Quiz
</NavLink>

      <button
        className="logout-btn"
        onClick={logout}
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}

export default Sidebar;