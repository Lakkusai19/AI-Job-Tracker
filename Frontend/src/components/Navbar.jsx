export default function Navbar() {
  const username = localStorage.getItem("username") || "User";

  return (
    <div className="top-navbar d-flex justify-content-between align-items-center mb-4">

      {/* Left Section */}
      <div>
        <h4 className="fw-bold mb-0">
          Dashboard
        </h4>

        <small className="text-muted">
          Manage your career journey
        </small>
      </div>

      {/* Profile Section */}
      <div className="d-flex align-items-center">

        <div
          className="rounded-circle d-flex justify-content-center align-items-center shadow"
          style={{
            width: "55px",
            height: "55px",
            background: "linear-gradient(135deg,#4f46e5,#06b6d4)",
            color: "#fff",
            fontSize: "26px",
            fontWeight: "bold",
          }}
        >
          {username.charAt(0).toUpperCase()}
        </div>

        <div className="ms-3">
          <h6 className="mb-0 fw-bold">
            {username}
          </h6>

          <small className="text-muted">
            AI Job Tracker
          </small>
        </div>

      </div>

    </div>
  );
}   