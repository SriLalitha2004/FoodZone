import React, { useState } from 'react';
import axios from 'axios';
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
      const response = await axios.post("http://localhost:4000/signup", inputData);
      alert(response.data.message);
    } catch (error) {
      setError(error.response?.data?.message || 'Signup failed');
      alert(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleOpen}
        className="bg-purple-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-purple-700 transition"
      >
        Sign Up
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-md mx-4">
            <div className="flex justify-end">
              <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">&times;</button>
            </div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Signup</h2>
            <form onSubmit={signupHandler} className="space-y-5">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={inputData.username}
                onChange={handleInput}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={inputData.email}
                onChange={handleInput}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={inputData.password}
                onChange={handleInput}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignupPopup