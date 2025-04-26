const express = require("express");
const upload = require("../middleware/multer");

const {
    addFoodItem,
    getFoodItemsByRestaurant,
    deleteFoodItem,
  } = require("../controllers/foodController");

  const foodRoutes = express.Router();

foodRoutes.post(
  "/add-foodItem",
  upload.single("foodImage"),
  addFoodItem
);

foodRoutes.get(
    "/restaurant-Items/:restaurantId",
    getFoodItemsByRestaurant
  );

foodRoutes.delete("/delete-foodItem/:foodItemId", deleteFoodItem);
  
  module.exports = foodRoutes;
  