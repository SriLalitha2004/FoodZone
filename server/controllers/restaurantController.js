const Restaurant = require("../models/Restaurant");
const Vendor = require("../models/Vendor");

// add new restaurant
const addRestaurant = async (req, res) => {
  try {
    const {
      restaurantName,
      restaurantImage,
      rating,
      offer,
      area,
      category,
      vendorId,
    } = req.body;
    console.log(req.body);

    let imageUrl = restaurantImage;

    if (req.file) {
      imageUrl = req.file.path;
    }

    // Check if vendor exists
    const vendor = await Vendor.findById(vendorId);
    if (!vendor)
      return res
        .status(404)
        .json({ success: false, message: "Vendor ID not found" });

    // Check if vendor already has a restaurant
    const existingRestaurant = await Restaurant.findOne({ vendor: vendorId });
    if (existingRestaurant)
      return res
        .status(400)
        .json({ success: false, message: "Already added a restaurant" });

    // Create new restaurant
    const newRestaurant = new Restaurant({
      restaurantName,
      restaurantImage: imageUrl,
      rating,
      offer,
      area,
      category,
      vendor: vendorId,
    });

    await newRestaurant.save();

    // Link restaurant to vendor
    vendor.restaurant = newRestaurant._id;
    await vendor.save();

    res.status(201).json({
      success: true,
      restaurantId: newRestaurant._id,
      message: "Restaurant added successfully",
      restaurant: newRestaurant,
    });
  } catch (error) {
    console.error("AddRestaurant Error: ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error! Please try again later.",
    });
  }
};


//get restaurants with
const getRestaurants = async (req, res) => {
    try {
      const restaurants = await Restaurant.find(req.query)
      res.status(200).json({ success: true, restaurants });
    } catch (error) {
      console.error("Get Restaurants: ", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error! Please try again later.",
      });
    }
  };

//Update restaurant by Id
const updateRestaurant = async (req, res) => {
  try {
  const {restaurantId}=req.params 
  const updateData=req.body 

  if (req.file) {
    updateData.restaurantImage = req.file.path.replace(/\\/g, "/"); // Store file path as string
  }

  const updatedRestaurant = await Restaurant.findByIdAndUpdate(
    restaurantId,
    updateData,
  );

  if (!updatedRestaurant) {
    return res
      .status(404)
      .json({ success: false, message: "Restaurant not found" });
  }

  res.json({
    success: true,
    message: "Restaurant updated successfully",
    updatedRestaurant,
  });
} catch (error) {
  console.error("UpdateRestaurant Error:", error);
  res.status(500).json({ success: false, message: "Internal server error" });
  }
}

  
// delete restaurant by id
  const deleteRestaurant = async (req, res) => {
    try {
      const { restaurantId } = req.params;
      // find restaurant by id
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res
          .status(404)
          .json({ success: false, message: "Restaurant not found" });
      }
      // delete restaurant
      await Restaurant.findByIdAndDelete(restaurantId);
      return res
        .status(200)
        .json({ success: true, message: "Restaurant Deleted successfully!" });
    } catch (error) {
      console.error("Delete Restaurant: ", error);
      res.status(500).json({
        success: false,
        message: "Internal server error. Please try again later",
      });
    }
  };
  

module.exports = {
  addRestaurant,
  getRestaurants,
  updateRestaurant,
  deleteRestaurant,
}