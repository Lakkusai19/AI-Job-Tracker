import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function AddJob() {
  const navigate = useNavigate();

  const [job, setJob] = useState({
    company: "",
    job_title: "",
    location: "",
    salary: "",
    status: "Applied",
    applied_date: "",
    notes: "",
  });

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access");

      await api.post("/jobs/", job, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Job Added Successfully!");

      navigate("/jobs");
    } catch (error) {
      console.log(error.response?.data);
      alert("Unable to save job.");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <h1>Add Job</h1>

        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: "700px",
            marginTop: "30px",
          }}
        >
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={job.company}
            onChange={handleChange}
            className="form-control mb-3"
            required
          />

          <input
            type="text"
            name="job_title"
            placeholder="Job Title"
            value={job.job_title}
            onChange={handleChange}
            className="form-control mb-3"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={job.location}
            onChange={handleChange}
            className="form-control mb-3"
          />

          <input
            type="text"
            name="salary"
            placeholder="Salary"
            value={job.salary}
            onChange={handleChange}
            className="form-control mb-3"
          />

          <select
            name="status"
            value={job.status}
            onChange={handleChange}
            className="form-control mb-3"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>

          <input
            type="date"
            name="applied_date"
            value={job.applied_date}
            onChange={handleChange}
            className="form-control mb-3"
          />

          <textarea
            rows="4"
            name="notes"
            placeholder="Notes"
            value={job.notes}
            onChange={handleChange}
            className="form-control mb-3"
          />

          <button className="btn btn-success">
            Save Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddJob;