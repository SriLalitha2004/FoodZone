const mongoose = require("mongoose");
const restaurantSchema = new mongoose.Schema({
    restaurantName: {
      type: String,
      required: true,
    },
    restaurantImage: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    offer: {
      type: String,
    },
    area: {
      type: String,
      required: true,
    }
    
})

module.exports=mongoose.model("Restaurant", restaurantSchema)