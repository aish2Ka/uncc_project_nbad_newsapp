const db = require("../config/db");

const ChartData = {
  checkTrailblazerDataExists: () => {
    const query = "SELECT * FROM trailblazer_awards LIMIT 1";
    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results.length > 0);
      });
    });
  },

  checkEnrollmentDataExists: () => {
    const query = "SELECT * FROM enrollment_growth LIMIT 1";
    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results.length > 0);
      });
    });
  },

  checkReportDataExists: () => {
    const query = "SELECT * FROM chart_data LIMIT 1"; // Ensure table name matches
    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results.length > 0);
      });
    });
  },

  seedTrailblazerData: (data) => {
    const query =
      "INSERT INTO trailblazer_awards (discipline, awards) VALUES ?";
    const values = data.map((item) => [item.discipline, item.awards]);
    return new Promise((resolve, reject) => {
      db.query(query, [values], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  },

  seedEnrollmentData: (data) => {
    const query = "INSERT INTO enrollment_growth (year, enrollment) VALUES ?";
    const values = data.map((item) => [item.year, item.enrollment]);
    return new Promise((resolve, reject) => {
      db.query(query, [values], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  },

  seedReportData: (data) => {
    const query = "INSERT INTO chart_data (data) VALUES ?";
    const values = data.map((item) => [JSON.stringify(item)]);
    return new Promise((resolve, reject) => {
      db.query(query, [values], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  },
  getTrailblazerData: (callback) => {
    const query = "SELECT * FROM trailblazer_awards";
      db.query(query,callback)
       
     
  },

  getEnrollmentData: (callback) => {
    const query = "SELECT * FROM enrollment_growth";
      db.query(query, callback)
       
        
  },

  getReportData: (callback) => {
    const query = "SELECT * FROM chart_data";
      db.query(query,callback)
  },
};

module.exports = ChartData;
