import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Footer from "./Footer";
import FoodCarousel from "./FoodCarousel";
import CartContext from "../context/CartContext";
import './Home.css'; // Import the CSS file

const HomePage = () => {
  const { cartList } = useContext(CartContext);
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("https://foodzone-server.onrender.com/api/restaurants");
        setRestaurants(response.data.restaurants);
        setFilteredRestaurants(response.data.restaurants);
      } catch (err) {
        setError("Failed to fetch restaurants");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    const lowerSearch = searchQuery.toLowerCase();
    const filtered = restaurants.filter(
      (r) =>
        r.restaurantName.toLowerCase().includes(lowerSearch) ||
        r.area.toLowerCase().includes(lowerSearch)
    );
    setFilteredRestaurants(filtered);
  }, [searchQuery, restaurants]);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("username");
    navigate("/dashboard", { replace: true });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home-page">
      {/* NavBar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="/logo.png" alt="Logo" className="logo" />
          <p className="logo-text">FoodZone</p>
        </div>
        <div className="navbar-links">
          <input
            type="text"
            placeholder="Search restaurants"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <Link to="/order-track" className="navbar-link">Order Track</Link>
          <Link to="/vendor-dashboard" className="navbar-link">Add Restaurant</Link>
          <Link to="/cart" className="navbar-link cart-link">
            Cart
            {cartList.length > 0 && (
              <span className="cart-count">{cartList.length}</span>
            )}
          </Link>
          <button
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="main-content">
        <h1 className="main-title">
          Discover the Best Food & Order Now
        </h1>

        <FoodCarousel />

        <h1 className="restaurant-title">
          Restaurants in Khammam
        </h1>

        {/* Restaurant Grid */}
        <div className="restaurant-grid">
          {filteredRestaurants.map((restaurant) => (
            <Link key={restaurant._id} to={`foodItems/${restaurant._id}`} className="restaurant-card">
              <div className="restaurant-card-content">
                <img
                  src={restaurant.restaurantImage || "https://via.placeholder.com/300x200"}
                  alt={restaurant.restaurantName}
                  className="restaurant-image"
                />
                <div className="restaurant-info">
                  <h2 className="restaurant-name">{restaurant.restaurantName}</h2>
                  <p className="restaurant-area">{restaurant.area}</p>
                  <p className="restaurant-rating">⭐ {restaurant.rating || "4.2"}</p>
                  <p className="restaurant-offers">{restaurant.offers || "10% OFF"}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
