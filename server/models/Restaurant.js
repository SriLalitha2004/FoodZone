const mongoose = require("mongoose");
const Vendor = require("./Vendor");
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
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      unique: true,
    }
})

module.exports=mongoose.model("Restaurant", restaurantSchema)