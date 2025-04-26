const express=require("express")
const {
    addRestaurant,getRestaurants, deleteRestaurant,
    updateRestaurant
  } = require("../controllers/restaurantController");

  const restaurantRoutes = express.Router();

  restaurantRoutes.post(
    "/add-restaurant",
    addRestaurant
  );

  restaurantRoutes.get(
    "/restaurants",
    getRestaurants
  );

  restaurantRoutes.put(
    "/update-restaurant/:restaurantId",
    updateRestaurant
  )

  restaurantRoutes.delete(
    "/delete-restaurant/:restaurantId",
    deleteRestaurant
  );
  
  module.exports = restaurantRoutes;