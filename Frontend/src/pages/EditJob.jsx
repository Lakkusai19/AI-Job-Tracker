import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../api/axios";

function EditJob() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [job, setJob] = useState({
    company: "",
    job_title: "",
    location: "",
    salary: "",
    status: "Applied",
    applied_date: "",
    notes: "",
  });

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await api.get(`jobs/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJob(response.data);
    } catch (error) {
      console.log(error);
      alert("Unable to load job.");
    }
  };

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

      await api.put(`jobs/${id}/`, job, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Job Updated Successfully!");

      navigate("/jobs");
    } catch (error) {
      console.log(error);
      alert("Update Failed!");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <h2>Edit Job</h2>

        <form onSubmit={handleSubmit} style={{ maxWidth: "700px" }}>
          <input
            type="text"
            className="form-control mb-3"
            name="company"
            value={job.company}
            onChange={handleChange}
            placeholder="Company"
          />

          <input
            type="text"
            className="form-control mb-3"
            name="job_title"
            value={job.job_title}
            onChange={handleChange}
            placeholder="Job Title"
          />

          <input
            type="text"
            className="form-control mb-3"
            name="location"
            value={job.location}
            onChange={handleChange}
            placeholder="Location"
          />

          <input
            type="text"
            className="form-control mb-3"
            name="salary"
            value={job.salary}
            onChange={handleChange}
            placeholder="Salary"
          />

          <select
            className="form-control mb-3"
            name="status"
            value={job.status}
            onChange={handleChange}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
            <option value="Selected">Selected</option>
          </select>

          <input
            type="date"
            className="form-control mb-3"
            name="applied_date"
            value={job.applied_date}
            onChange={handleChange}
          />

          <textarea
            className="form-control mb-3"
            rows="4"
            name="notes"
            value={job.notes}
            onChange={handleChange}
            placeholder="Notes"
          ></textarea>

          <button className="btn btn-success">
            Update Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditJob;