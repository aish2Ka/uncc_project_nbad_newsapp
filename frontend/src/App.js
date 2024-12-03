import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginComponent from "./components/Login/Login";
import ProtectedRoute from "./components/Authentication/ProtectedRoute";
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import Summary from "./components/Summary/Summary";
import Reports from "./components/Reports/Reports";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Header />
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/summary"
          element={
            <ProtectedRoute>
              <Header />
              <Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Header />
              <Reports />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

