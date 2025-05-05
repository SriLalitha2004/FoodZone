import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/vendor/vendor-login", {
        vendorEmail: email,
        vendorPassword:password,
      });
      if(response.data.success){
        Cookies.set("vendorToken", response.data.token, { expires: 50 });
        Cookies.set("vendorId", response.data.vendorId, { expires: 50 });
        Cookies.set("vendorName", response.data.vendorName, { expires: 50 });
        if (response.data.restaurantId) {
          Cookies.set("restaurantId", response.data.restaurantId);
        }
      }
      console.log("Login successful:", response.data);
      navigate("/add-restaurant", {replace: true});
      
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-lg p-4">
      <div className="bg-white/20 p-8 rounded-2xl shadow-2xl w-80">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2 rounded bg-white/40 placeholder-gray-600"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 rounded bg-white/40 placeholder-gray-600"
            required
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded transition duration-300">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
