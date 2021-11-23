const express = require("express");
const mongoose = require("mongoose");
const dotenv =require("dotenv")
const userRoute = require("./routes/user")

const app = express();

dotenv.config()

mongoose
  .connect(
    process.env.MONGO_URL
  )
  .then(() => console.log("connected MongoDB"))
  .catch((err) => console.log(err));
  
  app.use(express.json())
  app.use("/api/users", userRoute)  


app.listen(process.env.PORT || 5001, () => {
  console.log("server is running");
});
