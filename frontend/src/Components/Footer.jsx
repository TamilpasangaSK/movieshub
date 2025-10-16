import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/Footer.css';

// Accept onFilterChange as a prop
const Footer = ({ onFilterChange }) => {
    const [email, setEmail] = useState('');
    const currentYear = new Date().getFullYear();
    const navigate = useNavigate(); // Get the navigate function

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (email) {
            alert(`Thank you for subscribing with ${email}!`);
            setEmail('');
        }
    };

    // This function will apply the filter and navigate to the home page
    const handleCategoryClick = (filterType, value) => {
        if (onFilterChange) {
            onFilterChange({ genre: '', quality: '', [filterType]: value });
        }
        navigate('/'); // Go to the home page to see the results
    };

    return (
        <footer className="site-footer">
            <div className="footer-content">
                {/* Column 1: About Site (no changes) */}
                <div className="footer-column about-section">
                    <h4>About TamilMoviesHub</h4>
                    <p>
                        Your ultimate destination for high-quality Tamil movie entertainment. We provide a vast library of films, from classics to the latest blockbusters.
                    </p>
                    {/* ... social links ... */}
                </div>

                {/* Column 2: Quick Links (no changes) */}
                <div className="footer-column links-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/dmca">DMCA</Link></li>
                        <li><Link to="/request">Request A Movie</Link></li>
                    </ul>
                </div>

                {/* Column 3: Categories (UPDATED) */}
                <div className="footer-column links-section">
                    <h4>Categories</h4>
                    <ul>
                        {/* Changed from <Link> to <button> to trigger filtering */}
                        <li><button onClick={() => handleCategoryClick('quality', '4K')}>4K Movies</button></li>
                        <li><button onClick={() => handleCategoryClick('quality', '1080p')}>1080p Movies</button></li>
                        <li><button onClick={() => handleCategoryClick('genre', 'Anime')}>Anime</button></li>
                        <li><button onClick={() => handleCategoryClick('genre', 'Web Series')}>Web Series</button></li>
                    </ul>
                </div>

                {/* Column 4: Newsletter (no changes) */}
                <div className="footer-column newsletter-section">
                    <h4>Join Our Newsletter</h4>
                    <p>Get notified about the latest movie uploads and updates.</p>
                    <form onSubmit={handleNewsletterSubmit}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {currentYear} TamilMoviesHub. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;


