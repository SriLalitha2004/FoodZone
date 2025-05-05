import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import CartContext from "./context/CartContext";  // Import your context
import Dashboard from "./components/Dashboard";
import HomePage from "./components/HomePage";
import FoodItems from "./components/FoodItems";
import Cart from "./components/Cart";
import VendorPage from "./components/VendorPage";
import Login from "./components/Login";
import Register from "./components/Register";
import AddRestaurant from "./components/AddRestaurant";
import AddFood from "./components/AddFood";
import UpdateRestaurant from "./components/UpdateRestaurant";
import OrderTrack from "./components/OrderTrack";

function App() {
  const [cartList, setCartList] = useState([]);

  const addCartItem = (food) => {
    setCartList((prevCartList) => [...prevCartList, food]);
  };

  const deleteCartItem = (foodId) => {
    setCartList((prevCartList) =>
      prevCartList.filter((food) => food.id !== foodId)
    );
  };

  const clearCart = () => {
    setCartList([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        deleteCartItem,
        clearCart,
      }}
    >
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/foodItems/:id" element={<FoodItems />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/vendor-dashboard" element={<VendorPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-restaurant" element={<AddRestaurant />} />
        <Route path="/add-foodItem" element={<AddFood />} />
        <Route path="/update-restaurant" element={<UpdateRestaurant />} />
        <Route path="/order-track" element={<OrderTrack />} />
      </Routes>
    </CartContext.Provider>
  );
}

export default App;
