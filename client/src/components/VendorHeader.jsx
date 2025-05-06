import { Link } from "react-router-dom";
import "./VendorHeader.css";

export default function VendorHeader() {
  return (
    <nav className="vendor-nav">
      <div className="vendor-title">
        <h1>Vendor Dashboard</h1>
      </div>
      <div className="vendor-links">
        <Link to="/">FoodZone</Link>
        <Link to="/login" className="login-btn">Login</Link>
        <Link to="/register" className="register-btn">Register</Link>
      </div>
    </nav>
  );
}
