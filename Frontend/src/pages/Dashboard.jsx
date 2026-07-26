import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import api from "../api/axios";

import "../styles/dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    total_jobs: 0,
    applied: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await api.get("jobs/dashboard/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        {/* Hero Banner */}
        <div className="hero-banner mb-4">
          <div className="row align-items-center">

            <div className="col-lg-8">
              <h2 className="fw-bold">
                👋 Welcome Back
              </h2>

              <p className="mt-3">
                Manage your career journey with AI.
                Track your applications, interviews, offers and progress from one dashboard.
              </p>

              <button className="btn btn-light rounded-pill px-4 mt-3">
                <i className="bi bi-stars me-2"></i>
                Explore Dashboard
              </button>
            </div>

            <div className="col-lg-4 text-center">
              <i
                className="bi bi-bar-chart-fill"
                style={{ fontSize: "90px" }}
              ></i>
            </div>

          </div>
        </div>

        {/* Statistics */}
        <div className="row">

          <StatCard
            title="Total Jobs"
            value={stats.total_jobs}
            color="blue"
          />

          <StatCard
            title="Applied"
            value={stats.applied}
            color="green"
          />

          <StatCard
            title="Interview"
            value={stats.interview}
            color="orange"
          />

          <StatCard
            title="Offers"
            value={stats.offer}
            color="purple"
          />

          <StatCard
            title="Rejected"
            value={stats.rejected}
            color="red"
          />

        </div>

        {/* Charts */}
        <div className="row mt-4">

          <div className="col-lg-6 mb-4">

            <div className="chart-card">

              <h5 className="fw-bold mb-3">
                Applications by Status
              </h5>

              <BarChart stats={stats} />

            </div>

          </div>

          <div className="col-lg-6 mb-4">

            <div className="chart-card">

              <h5 className="fw-bold mb-3">
                Job Status Distribution
              </h5>

              <PieChart stats={stats} />

            </div>

          </div>

        </div>

        

      </div>
    </div>
  );
}

export default Dashboard;