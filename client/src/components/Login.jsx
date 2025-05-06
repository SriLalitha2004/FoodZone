import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import CSS

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://foodzone-server.onrender.com/vendor/vendor-login", {
        vendorEmail: email,
        vendorPassword: password,
      });
      if (response.data.success) {
        Cookies.set("vendorToken", response.data.token, { expires: 50 });
        Cookies.set("vendorId", response.data.vendorId, { expires: 50 });
        Cookies.set("vendorName", response.data.vendorName, { expires: 50 });
        if (response.data.restaurantId) {
          Cookies.set("restaurantId", response.data.restaurantId);
        }
        console.log("Login successful:", response.data);
        navigate("/add-restaurant", { replace: true });
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Vendor Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}
