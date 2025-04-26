// components/FoodItems.jsx
import React from "react";
import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FoodItems = () => {
  const { id } = useParams();
  const [foodItems, setFoodItems] = useState([]);
  const [err, setError] = useState(null);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {    
        const response = await axios.get(`http://localhost:4000/api/restaurant-Items/${id}`);
        console.log("Fetched data:", response.data);  
        setFoodItems(response.data.foodItems);        
      } catch (err) {
        setError("Failed to fetch food items");
      } 
    };
     fetchFoodItems();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {foodItems.map((item) => (
        <div key={item._id} className="bg-white rounded-2xl shadow p-4 border-2">
          <img
            src={item.image || "https://via.placeholder.com/300x200"}
            alt={item.name}
            className="w-full h-40 object-cover rounded-xl mb-3"
          />
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-600">{item.description}</p>
          <p className="text-orange-500 font-bold mt-2">₹ {item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default FoodItems;
