import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginPopup from './LoginPopup';
import SignupPopup from './SignupPopup';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="logo-link">
          <img src="/logo.png" alt="Logo" className="logo-img" />
          <span className="logo-text">FoodZone</span>
        </Link>
        <div className="navbar-spacer" />
        <div className="nav-links">
          <Link to="/vendor-dashboard" className="nav-link">Add Restaurant</Link>
          <div className="popup-btn pt-6"><LoginPopup /></div>
          <div className="popup-btn"><SignupPopup /></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
