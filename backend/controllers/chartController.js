const ChartData = require("../models/chartsModal");
const data = require("../constants/chartData");

// const seedData = (req, res) => {
// Check if Trailblazer Data already exists
// ChartData.checkTrailblazerDataExists((err, existingTrailblazerData) => {
//   if (err)
//     return res
//       .status(500)
//       .json({ message: "Error checking trailblazer data" });

// Only seed if data doesn't already exist
// if (existingTrailblazerData.length === 0) {
//   ChartData.seedTrailblazerData(data.trailblazerAwards, (err) => {
//     if (err)
//       return res
//         .status(500)
//         .json({ message: "Error seeding trailblazer data" });

// Check if Enrollment Data already exists
// ChartData.checkEnrollmentDataExists((err, existingEnrollmentData) => {
//   if (err)
//     return res
//       .status(500)
//       .json({ message: "Error checking enrollment data" });

// if (existingEnrollmentData.length === 0) {
//   ChartData.seedEnrollmentData(data.enrollmentGrowth, (err) => {
//     if (err)
//       return res
//         .status(500)
//         .json({ message: "Error seeding enrollment data" });

// Check if Reports Data already exists
// ChartData.checkReportDataExists((err, existingReportData) => {
//   if (err)
//     return res
//       .status(500)
//       .json({ message: "Error checking report data" });

//       if (existingReportData.length === 0) {
//         ChartData.seedReportData(data.reportsData, (err) => {
//           if (err) {
//             console.error("Error seeding chart data:", err);
//             return res
//               .status(500)
//               .json({ message: "Error seeding chart data" });
//           }

//           res
//             .status(201)
//             .json({ message: "Data seeded successfully" });
//         });
//       } else {
//         res
//           .status(400)
//           .json({ message: "Report data already exists" });
//       }
//     });
//   });
// } else {
//   res.status(400).json({ message: "Enrollment data already exists" });
// }
//   });
// });
// }
//  else {
//   res.status(400).json({ message: "Trailblazer data already exists" });
// };
// });
// };
const seedData = async (req, res) => {
  try {
    // Check Trailblazer Data
    const trailblazerExists = await ChartData.checkTrailblazerDataExists();
    if (!trailblazerExists) {
      await ChartData.seedTrailblazerData(data.trailblazerAwards);
    }

    // Check Enrollment Data
    const enrollmentExists = await ChartData.checkEnrollmentDataExists();
    if (!enrollmentExists) {
      await ChartData.seedEnrollmentData(data.enrollmentGrowth);
    }

    // Check Report Data
    const reportExists = await ChartData.checkReportDataExists();
    if (!reportExists) {
      await ChartData.seedReportData(data.reportsData);
    }

    res.status(201).json({ message: "Data seeded successfully" });
  } catch (err) {
    console.error("Error during data seeding:", err.message);
    res.status(500).json({ message: "Error seeding data" });
  }
};

// // Get all data
// const getSummaryChartData = (req, res) => {
//   const result = {};

//   ChartData.getTrailblazerData((err, trailblazerData) => {
//     if (err)
//       return res
//         .status(500)
//         .json({ message: "Error fetching trailblazer data" });

//     result.trailblazerAwards = trailblazerData;

//     ChartData.getEnrollmentData((err, enrollmentData) => {
//       if (err)
//         return res
//           .status(500)
//           .json({ message: "Error fetching enrollment data" });

//       result.enrollmentGrowth = enrollmentData;

//       res.status(200).json(result);
//     });
//   });
// };
const getSummaryChartData = (req, res) => {
  const result = {};
 
  ChartData.getTrailblazerData((err, trailblazerData) => {
    if (err) {
      console.error("Error fetching trailblazer data:", err.message);
      return res.status(500).json({ message: "Error fetching trailblazer data" });
    }
 
    result.trailblazerAwards = trailblazerData;
 
    ChartData.getEnrollmentData((err, enrollmentData) => {
      if (err) {
        console.error("Error fetching enrollment data:", err.message);
        return res.status(500).json({ message: "Error fetching enrollment data" });
      }
 
      result.enrollmentGrowth = enrollmentData;
 
      // Send the combined data as a response
      res.status(200).json(result);
    });
  });
};

const getReportsChartData = (req, res) => {
  const result = {};

  ChartData.getReportData((err, reportsData) => {
    if (err)
      return res.status(500).json({ message: "Error fetching reports data" });

    result.reportsData = reportsData;

    res.status(200).json(result);
  });
};

module.exports = { seedData, getSummaryChartData, getReportsChartData };
