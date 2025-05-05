import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Footer from "./Footer";
import FoodCarousel from "./FoodCarousel";
import CartContext from "../context/CartContext";

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

  if (loading) return <div className="p-4 text-lg text-center">Loading...</div>;
  if (error) return <div className="p-4 text-red-500 text-center">{error}</div>;

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* NavBar */}
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

      <div className="px-6 md:px-20 py-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Discover the Best Food & Order Now
        </h1>

        <FoodCarousel />

    
    <h1 className="text-2xl font-bold text-gray-800 p-4">
       Restaurants in Khammam
    </h1>


        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <Link key={restaurant._id} to={`foodItems/${restaurant._id}`} className="hover:scale-105 transform transition">
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden">
                <img
                  src={restaurant.restaurantImage || "https://via.placeholder.com/300x200"}
                  alt={restaurant.restaurantName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">{restaurant.restaurantName}</h2>
                  <p className="text-sm text-gray-500">{restaurant.area}</p>
                  <p className="text-sm text-yellow-600 font-medium mt-1">⭐ {restaurant.rating || "4.2"}</p>
                  <p className="text-sm text-green-600 mt-1">{restaurant.offers || "10% OFF"}</p>
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
