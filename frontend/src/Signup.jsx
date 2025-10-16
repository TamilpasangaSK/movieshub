import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/register", {
      name,
      email,
      password,
      confirmPassword
    })
    .then(res => {
      console.log(res);
      navigate("/login");
    })
    .catch(err => console.log(err));
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-avatar">👨🏻‍💻</div>
          <h2>Create Account</h2>
          <p className="lead">Join us today!</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row input-icon">
            <span className="icon">👤</span>
            <input
              type="text"
              placeholder="Enter Username"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          <div className="form-row input-icon">
            <span className="icon">✅</span>
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-auth">
            Signup
          </button>

          <div className="helper-line">
            Already have an account?
            <Link to="/login" className="link-pill">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
