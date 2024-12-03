import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";
import { SUMMARY_DATA } from "../../constants/summaryData"; // Import constants
import DOMPurify from "dompurify";
import parse from "html-react-parser";

const Summary = () => {
  const [combinedChartData, setCombinedChartData] = useState([]);
  const [summaryContent, setSummaryContent] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/summary-chart-data"
        );
        const data = response.data;

        if (data) {
          // Combine Trailblazer Awards and Enrollment Growth Data
          const combinedData = [
            ["Year", "Enrollment", "Awards"], // Column headers
            ...data.enrollmentGrowth.map((enrollmentItem, index) => [
              String(enrollmentItem.year), // Ensure year is treated as a string to remove commas
              enrollmentItem.enrollment,
              data.trailblazerAwards[index]
                ? data.trailblazerAwards[index].awards
                : 0, // Handle missing data gracefully
            ]),
          ];

          setCombinedChartData(combinedData);

          // Sanitize and set the text content for the summary
          const sanitizedSummary = DOMPurify.sanitize(
            SUMMARY_DATA.topic.summary
          );
          setSummaryContent(sanitizedSummary);
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    getData();
  }, []);

  return (
    <div className="summary-page container mx-auto p-6">
      <h1
        className="text-4xl font-bold text-center text-gray-800 mb-8"
        id="summary-heading"
      >
        UNC Charlotte CTL 25th Anniversary Summary
      </h1>

      {/* Topic Title and Summary */}
      <div
        className="topic-summary bg-white p-6 rounded-lg shadow-md mb-8"
        role="region"
        aria-labelledby="summary-heading"
      >
        <h2
          className="text-2xl font-semibold text-gray-800 mb-4"
          id="topic-title"
        >
          {SUMMARY_DATA.topic.title}
        </h2>

        {/* Render the sanitized summary using html-react-parser */}
        <div
          className="summary-text text-lg text-gray-700 mb-4"
          aria-live="polite"
        >
          {parse(summaryContent)} {/* Parsing and rendering HTML */}
        </div>

        {/* Source */}
        <div className="source-info flex items-center">
          <span className="text-sm text-gray-500">Source: </span>
          <a
            href={SUMMARY_DATA.topic.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-indigo-600 hover:underline"
            aria-label="Open source link for the topic"
          >
            {SUMMARY_DATA.topic.source_url}
          </a>
        </div>
      </div>

      {/* Combined Bar Chart Section */}
      <div
        className="chart-section bg-white p-6 rounded-lg shadow-md"
        role="region"
        aria-labelledby="pie-chart"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4" id="pie-chart">
          Combined Bar Chart: Enrollment Growth and Trailblazer Awards
        </h2>
        {combinedChartData.length > 0 ? (
          <Chart
            chartType="PieChart"
            data={combinedChartData}
            options={{
              title: "Enrollment Growth and Trailblazer Awards",
              vAxis: {
                title: "Values",
              },
              hAxis: {
                title: "Year",
                format: "0",
              },
              seriesType: "bars",
              series: {
                1: { type: "line", color: "#1cc88a" },
              },
              animation: {
                duration: 1000,
                easing: "out",
              },
              legend: { position: "top" },
            }}
            width="100%"
            height="400px"
            aria-live="polite"
            aria-describedby="combined-chart"
          />
        ) : (
          <p className="text-gray-600" aria-live="polite">
            Loading chart...
          </p>
        )}
      </div>
    </div>
  );
};

export default Summary;
