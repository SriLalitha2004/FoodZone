import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import './LoginPopup.css'; // assuming same file as above

const LoginPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('https://foodzone-server.onrender.com/login', credentials);
      if (res.data.success) {
        Cookies.set("token", res.data.token, { expires: 15 });
        Cookies.set("username", res.data.username, { expires: 15 });
        alert("User logged in successfully");
        closePopup();
        navigate("/", {replace: true}); // This redirects properly
      }
      else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="login-popup-container">
      <button className="login-button" onClick={openPopup}>
        Login
      </button>

      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-box">
            <button className="close-button" onClick={closePopup}>
              &times;
            </button>
            <h2 className="popup-title">Login to FoodZone</h2>
            <form onSubmit={handleLogin}>
              <input
                type="username"
                name="username"
                placeholder="username"
                value={credentials.username}
                onChange={handleChange}
                className="input-field"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input-field"
                value={credentials.password}
                onChange={handleChange}
                required
              />
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="submit-button">
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPopup;
