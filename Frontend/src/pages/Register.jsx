import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRobot, FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../api/axios";
import "../styles/auth.css";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      await api.post("accounts/register/", formData);

      setSuccess("🎉 Registration Successful!");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        {/* Left Section */}
        <div className="auth-left">
          <FaRobot />

          <h1>Join AI Job Tracker</h1>

          <p>
            Create your account and manage applications,
            interviews, AI-generated cover letters, and career
            progress from one beautiful dashboard.
          </p>
        </div>

        {/* Right Section */}
        <div className="auth-right">
          <div className="auth-card">
            <h2>Create Account ✨</h2>

            <p className="mb-4">
              Start tracking your dream job today
            </p>

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success">
                {success}
              </div>
            )}

            <form onSubmit={registerUser}>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "18px",
                    top: "18px",
                    cursor: "pointer",
                    color: "#6b7280",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <button className="auth-btn mt-3">
                Create Account
              </button>
            </form>

            <div className="text-center mt-4">
              Already have an account?{" "}
              <Link className="auth-link" to="/">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;