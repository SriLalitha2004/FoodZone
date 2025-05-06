import React, { useState } from 'react';
import axios from 'axios';
import './SignupPopup.css'; // Import normal CSS

function SignupPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputData, setInputData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://foodzone-server.onrender.com/signup", inputData);
      alert(response.data.message);
    } catch (error) {
      setError(error.response?.data?.message || 'Signup failed');
      alert(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <button onClick={handleOpen} className="signup-button">
        Sign Up
      </button>

      {isOpen && (
        <div className="signup-overlay">
          <div className="signup-modal">
            <div className="close-button">
              <button onClick={handleClose}>&times;</button>
            </div>
            <h2 className="signup-title">Signup</h2>
            <form onSubmit={signupHandler} className="signup-form">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={inputData.username}
                onChange={handleInput}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={inputData.email}
                onChange={handleInput}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={inputData.password}
                onChange={handleInput}
                required
              />
              {error && <p className="error-message">{error}</p>}
              <div className="signup-action">
                <button type="submit">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignupPopup;
