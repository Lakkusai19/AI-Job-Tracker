import {
  FaBriefcase,
  FaPaperPlane,
  FaUserTie,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

function StatCard({ title, value, color }) {
  const iconMap = {
    blue: <FaBriefcase size={30} />,
    green: <FaPaperPlane size={30} />,
    orange: <FaUserTie size={30} />,
    purple: <FaCheckCircle size={30} />,
    red: <FaTimesCircle size={30} />,
  };

  const bgMap = {
    blue: "primary",
    green: "success",
    orange: "warning",
    purple: "info",
    red: "danger",
  };

  return (
    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
      <div className={`card border-0 shadow-lg stat-card bg-${bgMap[color]} text-white`}>
        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center">

            <div>
              <h6 className="text-uppercase fw-semibold opacity-75">
                {title}
              </h6>

              <h2 className="fw-bold mt-3">{value}</h2>
            </div>

            <div className="icon-circle">
              {iconMap[color]}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default StatCard;