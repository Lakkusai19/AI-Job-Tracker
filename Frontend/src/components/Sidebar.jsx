import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBriefcase,
  FaRobot,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();

  // Get logged-in username
  const username = localStorage.getItem("username") || "User";

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="sidebar d-flex flex-column p-4">

      {/* Logo */}
      <div className="logo text-center mb-5">
        <i className="bi bi-stars me-2"></i>
        AI Job Tracker
      </div>

      {/* Dashboard */}
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
      >
        <FaHome />
        <span>Dashboard</span>
      </NavLink>

      {/* Jobs */}
      <NavLink
        to="/jobs"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
      >
        <FaBriefcase />
        <span>Jobs</span>
      </NavLink>

      {/* AI Assistant */}
      <NavLink
        to="/ai-assistant"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
      >
        <FaRobot />
        <span>AI Assistant</span>
      </NavLink>

      {/* Bottom Section */}
      <div className="mt-auto">

        <hr className="text-white" />

        <div className="text-center mb-3">

          <i
            className="bi bi-person-circle"
            style={{
              fontSize: "60px",
              color: "#fff",
            }}
          ></i>

          <h5 className="mt-3 mb-1 text-white fw-bold">
            Welcome
          </h5>

          <p
            className="mb-0"
            style={{
              color: "#ffffff",
              fontWeight: "600",
              fontSize: "18px",
            }}
          >
            {username}
          </p>

          <small className="text-white-50">
            AI Job Tracker
          </small>

        </div>

        <button
          className="btn btn-light w-100 rounded-3"
          onClick={logout}
        >
          <FaSignOutAlt className="me-2" />
          Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;