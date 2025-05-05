import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import smile from "../assets/smiling-chef.png";

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
      const res = await axios.post("http://localhost:4000/api/add-restaurant", payload, {
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
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-5 bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md">
        <h1 className="text-2xl font-bold tracking-wide">FoodZone</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline text-lg">Home</Link>
          <Link to="/add-restaurant" className="hover:underline text-lg">+ Add Restaurant</Link>
          <Link to="/add-foodItem" className="hover:underline text-lg">+ Add Food</Link>
          <Link to="/update-restaurant" className="hover:underline text-lg">✏️ Update Restaurant</Link>
        </div>
      </nav>

      {/* Hero Image */}
      <div className="w-full h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src={smile}
          alt="Delicious Food"
          className="w-full h-full object-contain md:object-cover"
        />
      </div>

      {/* Action Buttons */}
      <section className="my-10 flex flex-col md:flex-row items-center justify-center gap-6">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-md hover:scale-105 transition"
        >
          + Add Restaurant
        </button>
        <Link
          to="/manage-orders"
          className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-full shadow-md hover:scale-105 transition text-center"
        >
          Manage Orders
        </Link>
        <Link
          to="/update-restaurant"
          className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-full shadow-md hover:scale-105 transition text-center"
        >
          ✏️ Update Restaurant
        </Link>
      </section>

      {/* Add Restaurant Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-lg shadow-2xl relative animate-fade-in">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-5 text-gray-500 text-2xl hover:text-red-600"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add a New Restaurant</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="restaurantName"
                type="text"
                placeholder="Restaurant Name"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                name="rating"
                type="text"
                placeholder="Rating (e.g. 4.5)"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                name="area"
                type="text"
                placeholder="Area / Location"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Choose Image File</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-700"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Or Enter Image URL</label>
                <input
                  name="imageUrl"
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  onChange={handleChange}
                  value={form.imageUrl}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 rounded-full hover:scale-105 transition"
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
