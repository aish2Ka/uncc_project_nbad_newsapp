import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const endpoint = isLogin ? "/login" : "/register";
      const response = await axios.post(
        `http://167.172.130.236:3000/api/auth${endpoint}`,
        {
          username,
          password,
        }
      );

      setMessage(
        response.data.message ||
          (isLogin ? "User login successful" : "Registration successful")
      );

      // Store JWT token in localStorage if login is successful
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard"); // Navigate to dashboard after login
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg"
        role="main"
        aria-labelledby="auth-form-title"
      >
        <h2
          className="text-2xl font-bold text-center text-gray-800"
          id="auth-form-title"
        >
          {isLogin ? "Login" : "Register"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          aria-describedby="form-instructions"
        >
          <p id="form-instructions" className="sr-only">
            Please fill out the form to {isLogin ? "log in" : "register"}.
          </p>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300 border-gray-300"
              aria-required="true"
              aria-invalid={message ? "true" : "false"}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300 border-gray-300"
              aria-required="true"
              aria-invalid={message ? "true" : "false"}
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label={
              isLogin ? "Submit Login Form" : "Submit Registration Form"
            }
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {message && (
          <p
            className="text-center text-red-500 mt-4"
            role="alert"
            aria-live="polite"
          >
            {message}
          </p>
        )}

        <p className="text-sm text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
            aria-label={
              isLogin ? "Switch to Register Form" : "Switch to Login Form"
            }
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginComponent;
