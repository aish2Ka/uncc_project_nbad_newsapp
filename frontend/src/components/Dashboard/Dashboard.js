import React, { useEffect, useState } from "react";
import axios from "axios";
import { DASHBOARD_DATA } from "../../constants/dashBoardData";

function Dashboard() {
  const [message, setMessage] = useState("");
  const { topic, projectDetails } = DASHBOARD_DATA;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://167.172.130.236:3000/api/protected",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessage(response.data.message);
      } catch (error) {
        console.error("Error fetching protected data:", error.response?.data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div
        className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8"
        role="main"
        aria-labelledby="dashboard-title"
      >
        <h1
          id="dashboard-title"
          className="text-3xl font-bold text-gray-800 mb-6 text-center"
        >
          Dashboard
        </h1>

        <div className="mb-8">
          <h2
            className="text-xl font-semibold text-gray-700"
            aria-labelledby="topic-title"
            id="topic-title"
          >
            {topic.title}
          </h2>
          <p className="text-gray-600 mt-4" id="topic-summary">
            {topic.summary}
          </p>
          <p className="mt-4 text-sm text-gray-500">
            <strong>Reference:</strong>{" "}
            <a
              href={topic.reference}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
              aria-label={`Reference link: ${topic.reference}`}
            >
              {topic.reference}
            </a>
          </p>
        </div>

        <div
          className="mt-10 p-6 bg-gray-50 border border-gray-200 rounded-lg"
          aria-labelledby="project-details-title"
        >
          <h3
            id="project-details-title"
            className="text-lg font-medium text-gray-800"
          >
            Project Details
          </h3>
          <p className="text-gray-600 mt-4">{projectDetails}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
