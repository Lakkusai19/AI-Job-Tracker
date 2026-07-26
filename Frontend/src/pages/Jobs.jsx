// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//   FaPlus,
//   FaSearch,
//   FaEdit,
//   FaTrash,
//   FaMapMarkerAlt,
//   FaBuilding,
// } from "react-icons/fa";

// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import api from "../api/axios";

// function Jobs() {
//   const [jobs, setJobs] = useState([]);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const fetchJobs = async () => {
//     try {
//       const token = localStorage.getItem("access");

//       const response = await api.get("jobs/", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setJobs(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const deleteJob = async (id) => {
//     if (!window.confirm("Delete this job?")) return;

//     try {
//       const token = localStorage.getItem("access");

//       await api.delete(`jobs/${id}/`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       fetchJobs();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Search + Filter
//   const filteredJobs = jobs.filter((job) => {
//     const searchMatch =
//       job.company.toLowerCase().includes(search.toLowerCase()) ||
//       job.job_title.toLowerCase().includes(search.toLowerCase());

//     const statusMatch =
//       statusFilter === "All" || job.status === statusFilter;

//     return searchMatch && statusMatch;
//   });

//   return (
//     <div className="dashboard-container">
//       <Sidebar />

//       <div className="main-content">
//         <Navbar />

//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "20px",
//           }}
//         >
//           <h2>My Jobs</h2>

//           <button
//             className="btn btn-primary"
//             onClick={() => navigate("/jobs/add")}
//           >
//             + Add Job
//           </button>
//         </div>

//         {/* Search & Filter */}
//         <div
//           style={{
//             display: "flex",
//             gap: "15px",
//             marginBottom: "20px",
//           }}
//         >
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search Company or Job Title..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           <select
//             className="form-select"
//             style={{ maxWidth: "220px" }}
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//           >
//             <option value="All">All Status</option>
//             <option value="Applied">Applied</option>
//             <option value="Interview">Interview</option>
//             <option value="Offer">Offer</option>
//             <option value="Rejected">Rejected</option>
//           </select>

//           <button
//             className="btn btn-secondary"
//             onClick={() => {
//               setSearch("");
//               setStatusFilter("All");
//             }}
//           >
//             Clear
//           </button>
//         </div>

//         <table className="table table-striped table-hover">
//           <thead>
//             <tr>
//               <th>Company</th>
//               <th>Role</th>
//               <th>Location</th>
//               <th>Salary</th>
//               <th>Status</th>
//               <th>Applied Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredJobs.length > 0 ? (
//               filteredJobs.map((job) => (
//                 <tr key={job.id}>
//                   <td>{job.company}</td>
//                   <td>{job.job_title}</td>
//                   <td>{job.location}</td>
//                   <td>{job.salary}</td>
//                   <td>{job.status}</td>
//                   <td>{job.applied_date}</td>

//                   <td>
//                     <button
//                       className="btn btn-warning btn-sm me-2"
//                       onClick={() => navigate(`/jobs/edit/${job.id}`)}
//                     >
//                       Edit
//                     </button>

//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={() => deleteJob(job.id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-center">
//                   No jobs found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Jobs;




import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaMapMarkerAlt,
  FaBuilding,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../api/axios";

import "../styles/jobs.css";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await api.get("jobs/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      const token = localStorage.getItem("access");

      await api.delete(`jobs/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchJobs();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const searchMatch =
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.job_title.toLowerCase().includes(search.toLowerCase());

    const statusMatch =
      statusFilter === "All" || job.status === statusFilter;

    return searchMatch && statusMatch;
  });

  const getBadge = (status) => {
    switch (status) {
      case "Applied":
        return "bg-primary";
      case "Interview":
        return "bg-warning text-dark";
      case "Offer":
        return "bg-success";
      case "Rejected":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  return (<div className="dashboard-container">

  <Sidebar />

  <div className="main-content">

    <Navbar />

    {/* Hero Banner */}

    <div className="hero-banner mb-4">

      <div className="row align-items-center">

        <div className="col-lg-8">

          <h2 className="fw-bold">
            💼 My Job Tracker
          </h2>

          <p className="mb-0">
            Track and manage all your job opportunities in one beautiful dashboard.
          </p>

        </div>

        <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">

          <button
            className="btn btn-light rounded-pill px-4 py-2"
            onClick={() => navigate("/jobs/add")}
          >
            <FaPlus className="me-2" />
            Add New Job
          </button>

        </div>

      </div>

    </div>

    {/* Search & Filter */}

    <div className="card border-0 shadow-lg rounded-4 p-4 mb-4">

      <div className="row g-3">

        <div className="col-lg-6">

          <div className="input-group">

            <span className="input-group-text bg-primary text-white">

              <FaSearch />

            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Search company or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

        </div>

        <div className="col-lg-3">

          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >

            <option value="All">All Status</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>

          </select>

        </div>

        <div className="col-lg-3">

          <button
            className="btn btn-outline-secondary w-100"
            onClick={() => {
              setSearch("");
              setStatusFilter("All");
            }}
          >
            Clear Filters
          </button>

        </div>

      </div>

    </div>

    {/* Jobs Table */}

    <div className="card border-0 shadow-lg rounded-4">

      <div className="table-responsive">

        <table className="table table-hover align-middle mb-0">

          <thead className="table-dark">

            <tr>

              <th>Company</th>
              <th>Role</th>
              <th>Location</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Applied</th>
              <th className="text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredJobs.length > 0 ? (

              filteredJobs.map((job) => (

                <tr key={job.id}>

                  <td>

                    <FaBuilding className="text-primary me-2" />

                    <strong>{job.company}</strong>

                  </td>

                  <td>

                    {job.job_title}

                  </td>

                  <td>

                    <FaMapMarkerAlt className="text-danger me-2" />

                    {job.location}

                  </td>

                  <td>

                    <FaMoneyBillWave className="text-success me-2" />

                    {job.salary}

                  </td>

                  <td>

                    <span className={`badge rounded-pill px-3 py-2 ${getBadge(job.status)}`}>

                      {job.status}

                    </span>

                  </td>

                  <td>

                    <FaCalendarAlt className="text-info me-2" />

                    {job.applied_date}

                  </td>

                  <td className="text-center">

                    <button
                      className="btn btn-warning btn-sm rounded-circle me-2"
                      onClick={() => navigate(`/jobs/edit/${job.id}`)}
                    >

                      <FaEdit />

                    </button>

                    <button
                      className="btn btn-danger btn-sm rounded-circle"
                      onClick={() => deleteJob(job.id)}
                    >

                      <FaTrash />

                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td colSpan="7" className="text-center py-5">

                  <i
                    className="bi bi-briefcase"
                    style={{ fontSize: "70px", color: "#6c63ff" }}
                  ></i>

                  <h4 className="mt-3">

                    No Jobs Found

                  </h4>

                  <p className="text-muted">

                    Click "Add New Job" to start tracking your opportunities.

                  </p>

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  </div>

</div>

);
}

export default Jobs;