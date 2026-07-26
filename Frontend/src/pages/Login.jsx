import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRobot, FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../api/axios";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const response = await api.post("accounts/login/", formData);

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem("username", formData.username);
      const username = localStorage.getItem("username");

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid Username or Password");
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-wrapper">

        {/* Left Side */}

        <div className="auth-left">

          <FaRobot />

          <h1>AI Job Tracker</h1>

          <p>
            Organize your career journey with a beautiful dashboard,
            AI-powered cover letter generation, and job tracking.
          </p>

        </div>

        {/* Right Side */}

        <div className="auth-right">

          <div className="auth-card">

            <h2>Welcome Back 👋</h2>

            <p className="mb-4">
              Sign in to continue
            </p>

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                className="form-control"
                placeholder="Username"
                name="username"
                value={formData.username}
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
                Login
              </button>

            </form>

            <div className="text-center mt-4">

              Don't have an account?{" "}

              <Link className="auth-link" to="/register">
                Register
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;