import { useEffect, useState } from "react";
import API from "../services/api";
import "./profile.css";
import toast from "react-hot-toast";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    createdAt: "",
  });

  const [stats, setStats] = useState({
    enrolledCourses: 0,
    completedCourses: 0,
    completedLessons: 0,
    progress: 0,
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchStats();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/profile");
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await API.get("/dashboard/stats");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {
    try {
      setSaving(true);

      await API.put("/profile", {
        name: user.name,
        email: user.email,
      });

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      toast.success("Profile Updated");
    } catch (err) {
      console.log(err);

toast.error(
err.response?.data?.message ||
"Failed to Update Profile"
);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="profile-page">

      {/* LEFT CARD */}

      <div className="profile-left">

        <h4>Welcome Back 👋</h4>

        <h1>{user.name}</h1>

        <span className="profile-role">
          {user.role}
        </span>

        <p className="quote">
          Keep learning, keep growing.
          <br />
          Your future is built every day ✨
        </p>

        <div className="profile-stats">

          <div>
            <h2>{stats.enrolledCourses}</h2>
            <p>Enrolled Courses</p>
          </div>

          <div>
            <h2>{stats.completedCourses}</h2>
            <p>Completed Courses</p>
          </div>

          <div>
            <h2>{stats.completedLessons}</h2>
            <p>Lessons</p>
          </div>

        </div>

      </div>

      {/* RIGHT CARD */}

      <div className="profile-right">

        <h2>Edit Profile</h2>

        <label>Full Name</label>

        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
        />

        <label>Email Address</label>

        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />

        <label>Role</label>

        <input
          value={user.role}
          disabled
        />

        <button
          className="save-btn"
          onClick={saveProfile}
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : "Save Changes"}
        </button>

      </div>

      {/* ACCOUNT INFO */}

      <div className="account-card">

        <h2>Account Information</h2>

        <div className="info-row">
          <span>Email</span>
          <strong>{user.email}</strong>
        </div>

        <div className="info-row">
          <span>Role</span>
          <strong>{user.role}</strong>
        </div>

        <div className="info-row">
          <span>Joined On</span>
          <strong>
            {user.createdAt
              ? new Date(
                  user.createdAt
                ).toLocaleDateString()
              : "-"}
          </strong>
        </div>

        <div className="info-row">
          <span>Progress</span>
          <strong>
            {stats.progress}%
          </strong>
        </div>

      </div>

      {/* LEARNING SUMMARY */}

      <div className="summary-grid">

        <div className="summary-card">
          <h1>{stats.enrolledCourses}</h1>
          <p>Enrolled Courses</p>
        </div>

        <div className="summary-card">
          <h1>{stats.completedCourses}</h1>
          <p>Completed Courses</p>
        </div>

        <div className="summary-card">
          <h1>{stats.completedLessons}</h1>
          <p>Lessons Completed</p>
        </div>

        <div className="summary-card">
          <h1>{stats.progress}%</h1>
          <p>Overall Progress</p>
        </div>

      </div>

      {/* SECURITY */}

      <div className="security-card">

        <div>
          <h2>Security</h2>
          <p>
            Keep your account secure by
            updating your password regularly.
          </p>
        </div>

        <button className="change-btn">
          Change Password
        </button>

      </div>

    </div>
  );
}

export default Profile;