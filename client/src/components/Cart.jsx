import React, { useContext, useState } from "react";
import CartContext from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import './Cart.css';

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
    <div className="cart-container">
      {cartList.length === 0 ? (
        <div className="empty-cart">
          <p className="empty-cart-text">Your cart is empty</p>
          <button
            onClick={() => navigate("/")}
            className="order-now-btn"
          >
            Order Now
          </button>
        </div>
      ) : (
        <>
          <h2 className="cart-title">Your Cart</h2>
          {cartList.map((item) => (
            <div key={item._id} className="cart-item">
              <img
                src={item.foodImage}
                alt={item.foodName}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.foodName}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₹{item.price}</p>
              </div>
              <button
                onClick={() => deleteCartItem(item.id)}
                className="remove-item-btn"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="cart-actions">
            <button
              onClick={handlePlaceOrderClick}
              className="place-order-btn"
            >
              Place Order
            </button>

            {showConfirm && (
              <div className="address-form">
                <h3 className="address-title">Enter Delivery Address</h3>
                {["receiverName", "houseNumber", "street", "landmark", "mobile"].map((field) => (
                  <input
                    key={field}
                    name={field}
                    value={address[field]}
                    onChange={handleAddressChange}
                    placeholder={field}
                    className="address-input"
                  />
                ))}
                <p className="total-amount">Total: ₹{totalAmount}</p>
                <button
                  onClick={handleConfirmOrder}
                  className="confirm-order-btn"
                >
                  Confirm Order
                </button>
              </div>
            )}

            <button
              onClick={clearCart}
              className="clear-cart-btn"
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
