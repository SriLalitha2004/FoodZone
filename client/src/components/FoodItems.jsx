import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import CartContext from "../context/CartContext";

const FoodItems = () => {
  const { cartList } = useContext(CartContext);
  const { id } = useParams();
  const { addCartItem } = useContext(CartContext);
  const [foodItems, setFoodItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [restaurant, setRestaurant] = useState({});
  const [addedItemId, setAddedItemId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://foodzone-server.onrender.com/api/restaurant-Items/${id}`);
        setFoodItems(res.data.foodItems);
        setRestaurant(res.data.restaurant); // Ensure your backend returns this
      } catch (err) {
        console.error("Failed to fetch items:", err);
      }
    };
    fetchData();
  }, [id]);

  const handleAddToCart = (item, quantity) => {
    addCartItem({ ...item, quantity });
    setAddedItemId(item._id);
    setTimeout(() => setAddedItemId(null), 1000);
  };

  const handleLogout = () => {
      Cookies.remove("token");
      Cookies.remove("username");
      navigate("/dashboard", { replace: true });
    };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-10 w-10" />
          <p className="text-xl font-bold text-orange-500">FoodZone</p>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search restaurants"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <Link to="/order-track" className="text-gray-700 hover:text-orange-500 font-medium">Order Track</Link>
          <Link to="/vendor-dashboard" className="text-gray-700 hover:text-orange-500 font-medium">Add Restaurant</Link>
          <Link to="/cart" className="text-gray-700 hover:text-orange-500 font-medium flex items-center gap-1">
    Cart
    {cartList.length > 0 && (
      <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
        {cartList.length}
      </span>
    )}
  </Link>
          <button
            onClick={handleLogout}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Restaurant Info */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white shadow-md rounded-xl p-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {restaurant.restaurantName || "Restaurant Name"}
            </h2>
            <p className="text-gray-600 mt-1">
              {restaurant.categories?.join(", ") || "Biryani, Starters, North-Indian"}
            </p>
            <p className="text-gray-500">{restaurant.location || "Khammam"}</p>
          </div>
          <div className="flex items-center bg-green-500 text-white px-3 py-1 rounded-lg font-bold text-sm">
            ⭐ {restaurant.rating || "4.2"}
          </div>
        </div>

        {/* Food Items */}
        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-700">
          Food Items ({foodItems.length})
        </h3>

        <div className="space-y-6">
          {foodItems.map((item) => (
            <div
              key={item._id}
              className="flex items-start gap-4 bg-white p-4 rounded-xl shadow"
            >
              {/* Image + Badge + ADD */}
              <div className="relative w-36 h-28 shrink-0">
                <img
                  src={item.foodImage || "https://via.placeholder.com/150"}
                  alt={item.foodName}
                  className="w-full h-full object-cover rounded-md"
                />
                <div className="absolute top-0 left-0 bg-purple-600 text-white text-xs font-semibold px-2 py-0.5 rounded-br-md">
                  NEWLY LAUNCHED
                </div>
                <button
                  onClick={() => handleAddToCart(item, 1)}
                  className="absolute bottom-[-14px] left-1/2 transform -translate-x-1/2 bg-white text-green-600 border border-green-600 px-4 py-1 text-sm rounded-md hover:bg-green-50 transition"
                >
                  {addedItemId === item._id ? "Added!" : "ADD"}
                </button>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">{item.foodName}</h3>
                  <span
                    className={`text-sm font-semibold ${
                      item.category === "Veg" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {item.category}
                  </span>
                </div>
                <p className="text-orange-500 font-bold mt-1">₹{item.price}</p>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                  {item.description}{" "}
                  <span className="text-blue-500 cursor-pointer hover:underline">
                    Read More
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodItems;
