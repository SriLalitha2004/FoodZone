import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import smile from "../assets/smiling-chef.png";

const UpdateRestaurant = () => {
  const vendorId = Cookies.get("vendorId");
  const restaurantIdFromCookie = Cookies.get("restaurantId");
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    restaurantId: restaurantIdFromCookie || "",
    restaurantName: "",
    rating: "",
    offers: "",
    area: "",
    restaurantImage: null,
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, restaurantImage: e.target.files[0], imageUrl: "" });
  };

  const fetchRestaurantDetails = async () => {
    setError("");
    try {
      const token = Cookies.get("vendorToken");
      const res = await axios.get(
        `https://foodzone-server.onrender.com/api/restaurant/${form.restaurantId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = res.data.restaurant;
      if (data) {
        setForm((prev) => ({
          ...prev,
          restaurantName: data.restaurantName || "",
          rating: data.rating || "",
          offers: data.offers || "",
          area: data.area || "",
          imageUrl: typeof data.restaurantImage === "string" ? data.restaurantImage : "",
          restaurantImage: null,
        }));
      } else {
        setError("Restaurant not found.");
      }
    } catch (err) {
      setError("Failed to fetch restaurant details.");
    }
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

    if (!form.restaurantId) {
      setError("Restaurant ID is required.");
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
      const res = await axios.put("https://foodzone-server.onrender.com/api/update-restaurant", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        alert("\u2705 Restaurant Updated Successfully!");
        setIsOpen(false);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && form.restaurantId) {
      fetchRestaurantDetails();
    }
  }, [isOpen]);

  return (
    <div className="page-container">
      <nav className="navbar">
        <h1>FoodZone</h1>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/add-foodItem">+ Add Food</Link>
          <Link to="/update-restaurant">✏️ Update Restaurant</Link>
        </div>
      </nav>

      <div className="hero">
        <img src={smile} alt="Delicious Food" className="hero-image" />
      </div>

      <section className="update-section">
        <button
          onClick={() => {
            if (!restaurantIdFromCookie) {
              setError("❌ No restaurant ID found. Please log in again.");
              return;
            }
            setIsOpen(true);
          }}
          className="update-btn"
        >
          ✏️ Update My Restaurant
        </button>
      </section>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              onClick={() => setIsOpen(false)}
              className="close-btn"
            >
              &times;
            </button>

            <h2>Update Restaurant Info</h2>
            <form onSubmit={handleSubmit} className="modal-form">
              <input
                name="restaurantName"
                type="text"
                placeholder="Restaurant Name"
                value={form.restaurantName}
                onChange={handleChange}
              />
              <input
                name="rating"
                type="text"
                placeholder="Rating (e.g. 4.5)"
                value={form.rating}
                onChange={handleChange}
              />
              <input
                name="offers"
                type="text"
                placeholder="Offers (e.g. 20% off)"
                value={form.offers}
                onChange={handleChange}
              />
              <input
                name="area"
                type="text"
                placeholder="Area / Location"
                value={form.area}
                onChange={handleChange}
              />
              <label>Choose New Image File</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <label>Or Enter New Image URL</label>
              <input
                name="imageUrl"
                type="text"
                placeholder="https://example.com/image.jpg"
                onChange={handleChange}
                value={form.imageUrl}
              />
              {error && <p className="error-text">{error}</p>}
              <button type="submit" disabled={loading} className="submit-btn">
                {loading ? "Updating..." : "Update"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateRestaurant;
