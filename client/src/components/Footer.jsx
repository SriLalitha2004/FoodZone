import "./Footer.css";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h4 className="footer-heading">About FoodZone</h4>
          <ul className="footer-list">
            <li>Who We Are</li>
            <li>Blog</li>
            <li>Report Fraud</li>
            <li>Press Kit</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="footer-heading">Learn More</h4>
          <ul className="footer-list">
            <li>Claims</li>
            <li>Privacy</li>
            <li>Terms</li>
            <li>Policies</li>
            <li>Conditions</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="footer-heading">Available</h4>
          <ul className="footer-list">
            <li>Khammam</li>
            <li>SuryaPet</li>
            <li>Hyderabad</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="footer-heading">For Restaurants</h4>
          <ul className="footer-list">
            <li>Partner With Us</li>
            <li>Apps For You</li>
          </ul>
        </div>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <p className="footer-text">
          All rights reserved by Sri Lalitha Veeraboina 2025.
        </p>
        <div className="footer-social-icons">
          <FaFacebook className="footer-icon" />
          <FaGithub className="footer-icon" />
          <FaInstagram className="footer-icon" />
          <FaTwitter className="footer-icon" />
          <FaYoutube className="footer-icon" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
