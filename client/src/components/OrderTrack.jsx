import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderTrack = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("latestOrder");
    if (stored) setOrder(JSON.parse(stored));
  }, []);

  if (!order) {
    return (
      <div className="text-center mt-10">
        <p>No order found.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Order #{order.id}</h1>
      <p className="text-orange-600 font-medium">Status: {order.status}</p>

      <div>
        <h2 className="text-lg font-semibold mb-2">Items:</h2>
        {order.items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between border p-4 rounded mb-3"
          >
            <div>
              <p className="font-semibold">{item.foodName}</p>
              <p>Qty: {item.quantity}</p>
              <p>Price: ₹{item.price}</p>
            </div>
            <img
              src={item.foodImage}
              alt={item.foodName}
              className="w-20 h-20 object-cover rounded-md"
            />
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Delivery Address:</h2>
        <div className="bg-gray-100 p-4 rounded">
          <p>{order.address.receiverName}</p>
          <p>{order.address.houseNumber}</p>
          <p>{order.address.street}</p>
          <p>{order.address.landmark}</p>
          <p>Mobile: {order.address.mobile}</p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-green-700">
        Total: ₹{order.total}
      </h3>
    </div>
  );
};

export default OrderTrack;
