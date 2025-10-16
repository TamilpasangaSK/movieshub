// src/App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Home';
import Navigation from './Navigation/Navigation';
import MovieDetails from './Pages/MovieDetails';
import DMCA from './Pages/DMCA';
import About from './Pages/About';
import Request from './Pages/Request';
import Signup from './Signup';
import Login from './Login';
import Footer from './Components/Footer';
import './styles/App.css';

const App = () => {
  // State for managing filters (from previous steps)
  const [filters, setFilters] = useState({
    search: "", genre: "", year: "", quality: "", sortBy: "uploadDate",
  });

  // NEW: State for managing the logged-in user
  const [user, setUser] = useState(null);

  // NEW: Check for a logged-in user in localStorage when the app first loads
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  // NEW: Function to handle successful login, passed to the Login component
  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData)); // Save user to browser storage
    setUser(userData);
  };

  // NEW: Function to handle logout, passed to the Navigation component
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from browser storage
    setUser(null);
  };

  return (
    <BrowserRouter>
      <div>
        {/* Pass user state and logout function to Navigation */}
        <Navigation 
          onFilterChange={handleFilterChange} 
          user={user} 
          onLogout={handleLogout} 
        />
        <Routes>
          <Route 
            path="/" 
            element={<Home filters={filters} onFilterChange={handleFilterChange} />} 
          />
          {/* Pass the login function to the Login page */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* Other routes remain the same */}
          <Route path="/dmca" element={<DMCA />} />
          <Route path="/about" element={<About />} />
          <Route path="/request" element={<Request />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/movie/:movieId" element={<MovieDetails />} />
        </Routes>
        <Footer onFilterChange={handleFilterChange} />
      </div>
    </BrowserRouter>
  );
};

export default App;