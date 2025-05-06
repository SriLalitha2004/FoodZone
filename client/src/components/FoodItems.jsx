import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import CartContext from "../context/CartContext";
import './FoodItems.css';

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
        setRestaurant(res.data.restaurant);
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
    <div className="food-items-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src="/logo.jpg" alt="Logo" className="navbar-logo" />
          <p className="navbar-title text-white">FoodZone</p>
        </div>
        <div className="navbar-right">
          <input
            type="text"
            placeholder="Search restaurants"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="navbar-search"
          />
          <Link to="/order-track" className="navbar-link">Order Track</Link>
          <Link to="/vendor-dashboard" className="navbar-link">Add Restaurant</Link>
          <Link to="/cart" className="navbar-link cart-link">
            Cart
            {cartList.length > 0 && (
              <span className="cart-badge">{cartList.length}</span>
            )}
          </Link>
          <button onClick={handleLogout} className="navbar-logout-button">Logout</button>
        </div>
      </nav>

      {/* Restaurant Info */}
      <div className="restaurant-info">
        <div className="restaurant-header">
          <div>
            <h2 className="restaurant-name">{restaurant.restaurantName || "Restaurant Name"}</h2>
            <p className="restaurant-categories">
              {restaurant.categories?.join(", ") || "Biryani, Starters, North-Indian"}
            </p>
            <p className="restaurant-location">{restaurant.location || "Khammam"}</p>
          </div>
          <div className="restaurant-rating">
            ⭐ {restaurant.rating || "4.2"}
          </div>
        </div>

        {/* Food Items */}
        <h3 className="food-items-header">
          Food Items ({foodItems.length})
        </h3>

        <div className="food-items-list">
          {foodItems.map((item) => (
            <div key={item._id} className="food-item-card">
              {/* Image + Badge + ADD */}
              <div className="food-item-image-container">
                <img
                  src={item.foodImage || "https://via.placeholder.com/150"}
                  alt={item.foodName}
                  className="food-item-image"
                />
                <div className="food-item-new-badge">NEWLY LAUNCHED</div>
                <button
                  onClick={() => handleAddToCart(item, 1)}
                  className="food-item-add-button"
                >
                  {addedItemId === item._id ? "Added!" : "ADD"}
                </button>
              </div>

              {/* Content */}
              <div className="food-item-content">
                <div className="food-item-header">
                  <h3 className="food-item-name">{item.foodName}</h3>
                  <span className={`food-item-category ${item.category === "Veg" ? "veg" : "non-veg"}`}>
                    {item.category}
                  </span>
                </div>
                <p>{item.offer}</p>
                <p className="food-item-price">₹{item.price}</p>
                <p className="food-item-description">
                  {item.description}
                  <span className="food-item-read-more">Read More</span>
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
