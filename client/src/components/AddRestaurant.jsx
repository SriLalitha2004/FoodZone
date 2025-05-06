import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import smile from "../assets/smiling-chef.png";
import "./AddRestaurant.css";

const AddRestaurant = () => {
  const vendorId = Cookies.get("vendorId");
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    restaurantName: "",
    rating: "",
    offers: "",
    area: "",
    restaurantImage: null,
    imageUrl: "",
    category: "", // NEW
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, restaurantImage: e.target.files[0], imageUrl: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const vendorToken = Cookies.get("vendorToken");
    setError("");
    setLoading(true);

    if (!vendorToken || !vendorId) {
      setError("Vendor ID or Token Missing. Please login again.");
      setLoading(false);
      return;
    }

    const reader = new FileReader();

    if (form.restaurantImage) {
      reader.readAsDataURL(form.restaurantImage);
      reader.onloadend = async () => {
        const payload = {
          ...form,
          restaurantImage: reader.result,
          vendorId,
        };
        await sendRequest(payload, vendorToken);
      };
    } else if (form.imageUrl) {
      const payload = {
        ...form,
        restaurantImage: form.imageUrl,
        vendorId,
      };
      await sendRequest(payload, vendorToken);
    } else {
      setError("Please provide an image file or image URL.");
      setLoading(false);
    }
  };

  const sendRequest = async (payload, token) => {
    try {
      const res = await axios.post("https://foodzone-server.onrender.com/api/add-restaurant", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        alert("🎉 Restaurant Added Successfully!");
        setIsOpen(false);
      } else {
        setError(res.data.message || "Failed to add restaurant");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-restaurant-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="navbar-title">FoodZone</h1>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/add-restaurant" className="navbar-link">+ Add Restaurant</Link>
          <Link to="/add-foodItem" className="navbar-link">+ Add Food</Link>
          <Link to="/update-restaurant" className="navbar-link">Update Restaurant</Link>
        </div>
      </nav>

      {/* Hero Image */}
      <div className="hero-image">
        <img
          src={smile}
          alt="Delicious Food"
          className="hero-img"
        />
      </div>

      {/* Action Buttons */}
      <section className="action-buttons">
        <button
          onClick={() => setIsOpen(true)}
          className="action-btn"
        >
          + Add Restaurant
        </button>
        <Link
          to="/update-restaurant"
          className="action-btn update-restaurant"
        >
          Update Restaurant
        </Link>
      </section>

      {/* Add Restaurant Modal */}
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              onClick={() => setIsOpen(false)}
              className="close-btn"
            >
              &times;
            </button>
            <h2 className="modal-title">Add a New Restaurant</h2>
            <form onSubmit={handleSubmit} className="modal-form">
              <input
                name="restaurantName"
                type="text"
                placeholder="Restaurant Name"
                onChange={handleChange}
                required
                className="modal-input"
              />
              <input
                name="rating"
                type="text"
                placeholder="Rating (e.g. 4.5)"
                onChange={handleChange}
                required
                className="modal-input"
              />

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="modal-input"
              >
                <option value="">Select Category</option>
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
                <option value="Both">Both</option>
              </select>

              <input
                name="offers"
                type="text"
                placeholder="Offers (e.g. 20% off)"
                onChange={handleChange}
                required
                className="modal-input"
              />
              <input
                name="area"
                type="text"
                placeholder="Area / Location"
                onChange={handleChange}
                required
                className="modal-input"
              />
              <div className="file-upload">
                <label className="file-label">Choose Image File</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file-input"
                />
              </div>
              <div className="url-upload">
                <label className="url-label">Or Enter Image URL</label>
                <input
                  name="imageUrl"
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  onChange={handleChange}
                  value={form.imageUrl}
                  className="modal-input"
                />
              </div>
              {error && <p className="error-text">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="submit-btn"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddRestaurant;
