import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import {
  FaRobot,
  FaBriefcase,
  FaBuilding,
  FaTools,
  FaCopy,
  FaFilePdf,
  FaTrash,
  FaMagic,
} from "react-icons/fa";
import "../styles/assistant.css";

function AIAssistant() {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [skills, setSkills] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const generateCoverLetter = async () => {
    if (!jobTitle || !company || !skills) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("access");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/ai/cover-letter/",
        {
          job_title: jobTitle,
          company: company,
          skills: skills,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCoverLetter(response.data.cover_letter);
    } catch (error) {
      console.log(error);
      alert("Failed to generate cover letter.");
    }

    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(coverLetter);
    alert("Cover Letter copied successfully!");
  };

  const clearForm = () => {
    setJobTitle("");
    setCompany("");
    setSkills("");
    setCoverLetter("");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFont("times", "normal");
    doc.setFontSize(13);

    const lines = doc.splitTextToSize(coverLetter, 180);

    doc.text(lines, 15, 20);

    doc.save("CoverLetter.pdf");
  };

  const wordCount = coverLetter
    ? coverLetter.trim().split(/\s+/).length
    : 0;

  return (
    <div className="assistant-page">

      {/* Hero Section */}

      <div className="assistant-hero">

        <FaRobot className="hero-icon" />

        <h1>AI Cover Letter Generator</h1>

        <p>
          Create professional ATS-friendly cover letters in seconds using AI.
        </p>

      </div>

      {/* Main Card */}

      <div className="assistant-card">

        <div className="row g-4">

          {/* Left Panel */}

          <div className="col-lg-5">

            <div className="input-group-custom">

              <label>
                <FaBriefcase className="me-2" />
                Job Title
              </label>

              <input
                className="form-control"
                placeholder="Python Full Stack Developer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />

            </div>

            <div className="input-group-custom mt-3">

              <label>
                <FaBuilding className="me-2" />
                Company
              </label>

              <input
                className="form-control"
                placeholder="Google"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />

            </div>

            <div className="input-group-custom mt-3">

              <label>
                <FaTools className="me-2" />
                Skills
              </label>

              <textarea
                rows="8"
                className="form-control"
                placeholder="Python, Django, REST API, React, MySQL..."
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />

            </div>

            <button
              className="btn btn-gradient w-100 mt-4"
              onClick={generateCoverLetter}
              disabled={loading}
            >
              <FaMagic className="me-2" />

              {loading
                ? "Generating Cover Letter..."
                : "Generate Cover Letter"}
            </button>

          </div>

          {/* Right Panel */}

          <div className="col-lg-7">

            <div className="output-card">

              <div className="d-flex justify-content-between align-items-center mb-3">

                <h3 className="fw-bold mb-0">
                  🤖 Generated Cover Letter
                </h3>

                <div>

                  <span className="badge bg-primary me-2">
                    {coverLetter.length} Characters
                  </span>

                  <span className="badge bg-success">
                    {wordCount} Words
                  </span>

                </div>

              </div>

              <textarea
                className="cover-letter-output"
                value={coverLetter}
                placeholder="Your AI generated cover letter will appear here..."
                readOnly
              />

              {coverLetter && (

                <div className="action-buttons">

                  <button
                    className="btn btn-success"
                    onClick={copyToClipboard}
                  >
                    <FaCopy className="me-2" />
                    Copy
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={downloadPDF}
                  >
                    <FaFilePdf className="me-2" />
                    Download PDF
                  </button>

                  <button
                    className="btn btn-secondary"
                    onClick={clearForm}
                  >
                    <FaTrash className="me-2" />
                    Clear
                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AIAssistant;