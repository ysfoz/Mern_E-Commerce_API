const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

dotenv.config()

const app = express();


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected MongoDB"))
  .catch((err) => console.log(err));
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout",stripeRoute);

const PORT = process.env.PORT || 8081

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
