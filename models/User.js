const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    adress: { type: String},
    postalcode: { type: Number},
    city:{type:String},
    country:{type:String},
    tel:{type:Number},
    fullname:{type:String},
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
