import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";

// --- SVG Icons for the profile dropdown ---
const ProfileIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);
const LogoutIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
);

// Accept `user` and `onLogout` as props from App.jsx
const Navigation = ({ onFilterChange, user, onLogout }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const profileRef = useRef(null);

  // Effect for handling search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ search: query });
    }, 300); // Debounce: waits 300ms after user stops typing
    return () => clearTimeout(timer);
  }, [query, onFilterChange]);

  // Effect for closing menus on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isDropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) setDropdownOpen(false);
      if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) setMobileMenuOpen(false);
      if (isProfileOpen && profileRef.current && !profileRef.current.contains(event.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isDropdownOpen, isMobileMenuOpen, isProfileOpen]);

  // Logout handler
  const handleLogoutClick = () => {
    onLogout();
    closeMenus();
    navigate('/');
  };

  const handleCategoryClick = (filterType, value) => {
    onFilterChange({ genre: '', quality: '', search: '', [filterType]: value });
    setQuery(''); // Clear search input when category is clicked
    closeMenus();
  };

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    setProfileOpen(false);
  };
  
  const submitSearch = (e) => e.preventDefault();

  return (
    <>
      <nav className="navigation-container" role="navigation" aria-label="Main">
        <div className="nav-left"><div className="navigation-title">TamilMoviesHub</div></div>
        
        <form className="search-inline" onSubmit={submitSearch}>
          <input 
            type="search" 
            placeholder="Search movies..." 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
          />
        </form>
        
        <ul className="navigation-list">
          <li><Link to="/" className="navigation-link" onClick={closeMenus}>Home</Link></li>
          
          <li className="dropdown" ref={dropdownRef}>
             <button type="button" className="navigation-link dropdown-toggle" onClick={() => setDropdownOpen(!isDropdownOpen)}>Categories</button>
             <ul className={`dropdown-menu ${isDropdownOpen ? "open" : ""}`}>
                <li><button className="dropdown-link" onClick={() => handleCategoryClick('quality', '4K')}>4K Movies</button></li>
                <li><button className="dropdown-link" onClick={() => handleCategoryClick('quality', '1080p')}>1080p Movies</button></li>
                <li><button className="dropdown-link" onClick={() => handleCategoryClick('genre', 'Anime')}>Anime</button></li>
                <li><button className="dropdown-link" onClick={() => handleCategoryClick('genre', 'Web Series')}>Web Series</button></li>
                <li><button className="dropdown-link" onClick={() => handleCategoryClick('genre', 'Songs')}>Songs</button></li>
                <li><button className="dropdown-link" onClick={() => handleCategoryClick('genre', 'Adults')}>Adults</button></li>
                <li><button className="dropdown-link" onClick={() => handleCategoryClick('genre', 'Kids')}>Kids</button></li>
                <li><button className="dropdown-link" onClick={() => handleCategoryClick('quality', 'HDR')}>Dovi - HDR</button></li>
                <li><button className="dropdown-link" onClick={() => handleCategoryClick('genre', '60 FPS')}>60 FPS</button></li>
                <li><button className="dropdown-link" onClick={() => handleCategoryClick('genre', 'Series')}>Series</button></li>
             </ul>
          </li>
          
          <li><Link to="/DMCA" className="navigation-link" onClick={closeMenus}>DMCA</Link></li>
          <li><Link to="/About" className="navigation-link" onClick={closeMenus}>About</Link></li>
          <li><Link to="/Request" className="navigation-link" onClick={closeMenus}>Request</Link></li>
          
          {user ? (
            <li className="dropdown" ref={profileRef}>
              <button type="button" className="navigation-link profile-toggle" onClick={() => setProfileOpen(!isProfileOpen)}>
                <ProfileIcon />
              </button>
              <div className={`profile-menu ${isProfileOpen ? "open" : ""}`}>
                <div className="profile-header">
                  <div className="profile-avatar"><ProfileIcon /></div>
                  <div className="profile-info">
                    <div className="profile-name">{user.name}</div>
                    <div className="profile-email">{user.email}</div>
                  </div>
                </div>
                <button className="profile-logout-btn" onClick={handleLogoutClick}>
                  <LogoutIcon /> Logout
                </button>
              </div>
            </li>
          ) : (
            <li><Link to="/Signup" className="navigation-link" onClick={closeMenus}>Signup</Link></li>
          )}
        </ul>

        <button className={`nav-toggle ${isMobileMenuOpen ? "open" : ""}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          <span className="hamburger" />
        </button>
      </nav>

      <div className={`mobile-menu ${isMobileMenuOpen ? "mobile-menu-open" : ""}`} ref={mobileMenuRef} aria-hidden={!isMobileMenuOpen}>
        <ul className="mobile-list">
          <li><Link to="/" className="mobile-link" onClick={closeMenus}>Home</Link></li>
          <li className="mobile-dropdown">
            <details>
              <summary>Categories ▾</summary>
              <ul>
                <li><button className="mobile-link" onClick={() => handleCategoryClick('quality', '4K')}>4K Movies</button></li>
                <li><button className="mobile-link" onClick={() => handleCategoryClick('quality', '1080p')}>1080p Movies</button></li>
                <li><button className="mobile-link" onClick={() => handleCategoryClick('genre', 'Anime')}>Anime</button></li>
                <li><button className="mobile-link" onClick={() => handleCategoryClick('genre', 'Web Series')}>Web Series</button></li>
                <li><button className="mobile-link" onClick={() => handleCategoryClick('genre', 'Songs')}>Songs</button></li>
                <li><button className="mobile-link" onClick={() => handleCategoryClick('genre', 'Adults')}>Adults</button></li>
                <li><button className="mobile-link" onClick={() => handleCategoryClick('genre', 'Kids')}>Kids</button></li>
                <li><button className="mobile-link" onClick={() => handleCategoryClick('quality', 'HDR')}>Dovi - HDR</button></li>
                <li><button className="mobile-link" onClick={() => handleCategoryClick('genre', '60 FPS')}>60 FPS</button></li>
                <li><button className="mobile-link" onClick={() => handleCategoryClick('genre', 'Series')}>Series</button></li>
              </ul>
            </details>
          </li>
          <li><Link to="/DMCA" className="mobile-link" onClick={closeMenus}>DMCA</Link></li>
          <li><Link to="/About" className="mobile-link" onClick={closeMenus}>About</Link></li>
          <li><Link to="/Request" className="mobile-link" onClick={closeMenus}>Request</Link></li>
          {user ? (
            <li><button className="mobile-link logout-btn-mobile" onClick={handleLogoutClick}>Logout</button></li>
          ) : (
            <li><Link to="/Signup" className="mobile-link" onClick={closeMenus}>Signup</Link></li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navigation;