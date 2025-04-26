import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const RestaurantList = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/restaurants");
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

  if (loading) return <div className="p-4 text-lg">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div>
      {/*  NavBar */}
      <nav className="flex items-center justify-between bg-white-600 p-4 color-black shadow-lg">
      <div className="flex flex-col items-center space-x-4">
          <img src="/logo.png" alt="Logo" className="h-10 w-10" />
          <p className="text-sm font-bold text-gray-800">FoodZone</p>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search restaurants"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="color-white p-2 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-black"
          />
          <Link to="/cart" className="text-black font-semibold hover:underline">
            Cart
          </Link>
          <button onClick={handleLogout} className="bg-white text-blue-600 px-4 py-2 rounded-xl hover:bg-gray-100 transition">
            Logout
          </button>

        </div>
      </nav>
      
    <div className="pl-20 pr-20">
      <h1 className="text-center text-3xl font-bold mb-8 mt-4 px-4">
        Discover Best Food and Order Now
      </h1>


      {/* Restaurant Grid */}
      <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredRestaurants.map((restaurant) => (
          <Link key={restaurant._id} to={`foodItems/${restaurant._id}`}>
            <div className="bg-white rounded-2xl shadow p-4 border-2 hover:shadow-lg transition">
              <img
                src={restaurant.restaurantImage || "https://via.placeholder.com/300x200"}
                alt={restaurant.restaurantName}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h2 className="text-xl font-semibold">{restaurant.restaurantName}</h2>
              <p className="text-gray-600">{restaurant.area}</p>
              <p className="text-gray-600">{restaurant.ratings} ⭐</p>
              <p className="text-gray-600">{restaurant.offer}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </div>

  );
};

export default RestaurantList;
