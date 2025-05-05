import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

export default function LoginPopup() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
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
      console.log(res)
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
  

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   try {
  //     const res = await axios.post('http://localhost:4000/login', credentials);
  //     alert('User logged in successfully');
  //     console.log('Login response:', res.data);
  //     closePopup();
  //   } catch (err) {
  //     setError(err.response?.data?.message || 'Login failed');
  //   }
  // };

  return (
    <div className="mt-4">
      <button
        onClick={openPopup}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Login
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-md mx-4 relative">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={credentials.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error && <p className="text-red-600 text-sm text-center">{error}</p>}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
