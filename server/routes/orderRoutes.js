const express=require("express")
const {
    createOrder,
    getAllOrders,
    updateOrderStatus,
  } = require("../controllers/orderController");
  
  const orderRoutes = express.Router();
  
  // Create new order
  orderRoutes.post("/orders", createOrder);
  
  // Get all orders for user
  orderRoutes.get("/all-orders", getAllOrders);
  
  // Update order status (vendor only)
  orderRoutes.put("/order-status/:orderId", updateOrderStatus);
  
  module.exports = orderRoutes;