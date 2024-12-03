import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { REPORT_DATA } from "../../constants/reportsData";

const Reports = () => {
  const [chartData, setChartData] = useState([]);
  const [summaryContent, setSummaryContent] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/reports-chart-data"
        );
        const data = response.data.reportsData;

        if (Array.isArray(data) && data.length > 0) {
          const formattedData = [...data.map((item) => item.data)];

          setChartData(formattedData);
        } else {
          console.error("Invalid data structure received:", data);
        }

        const sainitizedSummary = DOMPurify.sanitize(REPORT_DATA.content);
        setSummaryContent(sainitizedSummary);
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };

    getData();
  }, []);
  console.log(chartData, "45678");

  return (
    <div className="summary-page container mx-auto p-6">
      <h1
        className="text-4xl font-bold text-center text-gray-800 mb-8"
        id="summary-heading"
      >
        Immersive Art Installation: Mare Liberum, Reimagined Reports
      </h1>

      <div
        className="topic-summary bg-white p-6 rounded-lg shadow-md mb-8"
        role="region"
        aria-labelledby="summary-heading"
      >
        <h2
          className="text-2xl font-semibold text-gray-800 mb-4"
          id="topic-title"
        >
          Mare Liberum, Reimagined: Environmental Impact Report
        </h2>

        <div
          className="summary-text text-lg text-gray-700 mb-4"
          aria-live="polite"
        >
          {parse(summaryContent)}
        </div>

        <div className="source-info flex items-center">
          <span className="text-sm text-gray-500">Source: </span>
          <a
            href="https://coaa.charlotte.edu/2024/11/01/professors-art-installation-plunges-viewers-into-a-kelp-forest/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-indigo-600 hover:underline"
            aria-label="Open source link for the topic"
          >
            {REPORT_DATA.sourceUrl}
          </a>
        </div>
      </div>

      <div
        className="chart-section bg-white p-6 rounded-lg shadow-md"
        role="region"
        aria-labelledby="bar-chart"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4" id="pie-chart">
          Environmental Data: Kelp Forest Health and Marine Life
        </h2>
        {chartData.length > 0 ? (
          <Chart
            chartType="BarChart"
            data={chartData}
            options={{
              title: "Environmental Impact Over the Years",
              hAxis: {
                title: "Values",
              },
              vAxis: {
                title: "Year",
              },
              chartArea: { width: "50%" },
              legend: { position: "top" },
              animation: {
                duration: 1000,
                easing: "out",
              },
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

export default Reports;
