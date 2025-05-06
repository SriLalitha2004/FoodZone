import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ searchQuery, setSearchQuery, cartList, handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <div className="navbar-logo">
          <img src="/logo.png" alt="Logo" className="logo" />
          <p className="logo-text">FoodZone</p>
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>

      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <input
          type="text"
          placeholder="Search restaurants"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <Link to="/order-track" className="navbar-link">
          Order Track
        </Link>
        <Link to="/vendor-dashboard" className="navbar-link">
          Add Restaurant
        </Link>
        <Link to="/cart" className="navbar-link cart-link">
          Cart
          {cartList.length > 0 && (
            <span className="cart-count">{cartList.length}</span>
          )}
        </Link>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
