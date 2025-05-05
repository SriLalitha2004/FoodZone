import React, { useContext, useState } from "react";
import CartContext from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartList, deleteCartItem, clearCart } = useContext(CartContext);
  const [showConfirm, setShowConfirm] = useState(false);
  const [address, setAddress] = useState({
    receiverName: "",
    houseNumber: "",
    street: "",
    landmark: "",
    mobile: "",
  });

  const navigate = useNavigate();

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrderClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmOrder = () => {
    const order = {
      id: Date.now(),
      items: cartList,
      address,
      status: "Delivered",
      total: cartList.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
    };
    localStorage.setItem("latestOrder", JSON.stringify(order));
    clearCart();
    navigate("/order-track");
  };

  const totalAmount = cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      {cartList.length === 0 ? (
        <div className="text-center">
          <p className="text-lg font-medium">Your cart is empty</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full"
          >
            Order Now
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
          {cartList.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-4 border-b"
            >
              <img
                src={item.foodImage}
                alt={item.foodName}
                className="w-20 h-20 object-cover rounded-md mr-4"
              />
              <div className="flex-grow">
                <h3 className="font-semibold">{item.foodName}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₹{item.price}</p>
              </div>
              <button
                onClick={() => deleteCartItem(item.id)}
                className="text-red-500 hover:underline ml-4"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-6 space-y-4">
            <button
              onClick={handlePlaceOrderClick}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-full"
            >
              Place Order
            </button>

            {showConfirm && (
              <div className="bg-gray-100 p-4 rounded-lg mt-4">
                <h3 className="text-lg font-semibold mb-2">Enter Delivery Address</h3>
                {["receiverName", "houseNumber", "street", "landmark", "mobile"].map((field) => (
                  <input
                    key={field}
                    name={field}
                    value={address[field]}
                    onChange={handleAddressChange}
                    placeholder={field}
                    className="w-full mb-2 p-2 border rounded"
                  />
                ))}
                <p className="text-md mt-2 font-medium">Total: ₹{totalAmount}</p>
                <button
                  onClick={handleConfirmOrder}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full"
                >
                  Confirm Order
                </button>
              </div>
            )}

            <button
              onClick={clearCart}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-full"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
