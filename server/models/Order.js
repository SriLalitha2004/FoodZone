const mongoose=require("mongoose")

const orderSchema=new mongoose.Schema({

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    },

    items: [
      {
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        foodName: {
          type: String,
          required: true,
        },
        foodImage: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],

    address: [
        {
        receiverName: {
          type: String,
          required: true,
        },
        houseNumber: {
          type: String,
          required: true,
        },
        street: {
          type: String,
          required: true,
        },
        landmark: {
          type: String,
          required: true,
        },
        mobile: {
          type: String,
          required: true,
        },
        }
    ],

    status: {
      type: String,
      enum: ["pending", "in progress" ,"Delivered"],
      default: "Pending",
    },

    total: {
      type: Number,
      required: true,
    }
})

module.exports=mongoose.model("Order", orderSchema)