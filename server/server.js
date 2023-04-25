const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const conversationsRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const postRoute = require("./routes/post");
const errorHandler = require("./helpers/errorHandler");

dotenv.config();

const app = express();

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/users", userRoute);
app.use("/api/post", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/conversation", conversationsRoute);
app.use("/api/messages", messageRoute);

//errors
app.use(errorHandler);

const start = async () => {
  try {
    mongoose.set("strictQuery", true);

    app.listen(process.env.PORT, () => {
      console.log(`Server start at http://localhost:${process.env.PORT}`);
    });

    await mongoose.connect(process.env.MONGO_URL, () => {
      console.log("Connected to MongoDB");
    });
  } catch (error) {
    console.log(error.message);
  }
};

start();
