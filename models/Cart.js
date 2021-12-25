const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        title:{
          type:String,
        },
        price:{
          type:Number,
        },
        img:{
          type:String,
        },
        color:{
          type:String,
        },
        size:{
          type:String,
        },
        saveForLater:{
          type:Boolean,
          default:false,
        }

      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
