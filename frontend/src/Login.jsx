import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// You must accept the `onLogin` function as a prop from App.jsx
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/login", { email, password })
      .then(res => {
        console.log("Backend Response:", res.data); // This helps with debugging

        // FIXED: This now matches your working code's success condition
        if (res.data === "Login Successful") {
          
          // CRITICAL FIX: Create a user object with the email we have.
          // We will use a placeholder for the name for now.
          const userData = {
            name: "User", // This is a placeholder
            email: email   // We use the email from the form
          };

          // This is the most important step: Tell the app that the user is logged in
          onLogin(userData);
          
          // Navigate to the home page
          navigate("/");

        } else {
          alert("Invalid Credentials");
        }
      })
      .catch(err => {
        console.log(err);
        alert("An error occurred during login.");
      });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-avatar">🔒</div>
          <h2>Welcome Back</h2>
          <p className="lead">Sign in to continue</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row input-icon">
            <span className="icon">📧</span>
            <input
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-row input-icon">
            <span className="icon">🔑</span>
            <input
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-auth">
            Login
          </button>

          <div className="helper-line">
            Don’t have an account?
            <Link to="/register" className="link-pill">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;