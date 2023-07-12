require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const connectionParams = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
  .connect(process.env.REACT_APP_MONGODB_URI, connectionParams)
  .then(() => {
    console.log("connected to db");
  })
  .catch((e) => {
    console.log(e);
  });

app.use("/api/user", userRoutes);

app.listen(4000, console.log("listening 4000"));
