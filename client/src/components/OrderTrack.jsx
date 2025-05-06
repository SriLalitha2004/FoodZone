import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderTrack.css"; // Import the CSS file

const OrderTrack = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("latestOrder");
    if (stored) setOrder(JSON.parse(stored));
  }, []);

  if (!order) {
    return (
      <div className="centered-message">
        <p>No order found.</p>
        <button onClick={() => navigate("/")} className="continue-btn">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="order-container">
      <h1 className="order-title">Order #{order.id}</h1>
      <p className="order-status">Status: {order.status}</p>

      <div>
        <h2 className="section-title">Items:</h2>
        {order.items.map((item, idx) => (
          <div key={idx} className="order-item">
            <div>
              <p className="item-name">{item.foodName}</p>
              <p>Qty: {item.quantity}</p>
              <p>Price: ₹{item.price}</p>
            </div>
            <img
              src={item.foodImage}
              alt={item.foodName}
              className="item-image"
            />
          </div>
        ))}
      </div>

      <div>
        <h2 className="section-title">Delivery Address:</h2>
        <div className="address-box">
          <p>{order.address.receiverName}</p>
          <p>{order.address.houseNumber}</p>
          <p>{order.address.street}</p>
          <p>{order.address.landmark}</p>
          <p>Mobile: {order.address.mobile}</p>
        </div>
      </div>

      <h3 className="order-total">Total: ₹{order.total}</h3>
    </div>
  );
};

export default OrderTrack;
