import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="header">
      <div className="logo-container">
        <img src="/logo.png" alt="Logo" className="logo" />
        <p className="logo-text">FoodZone</p>
      </div>
      <div className="nav-links">
        <input
          type="text"
          placeholder="Search restaurants"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <Link to="/cart" className="nav-link cart-link">
          Cart
        </Link>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Header;
