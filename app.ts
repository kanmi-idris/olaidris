require("module-alias/register");
require("dotenv").config();
import connectDB from "@config/dbConfig";
import envConfig from "@config/envConfig";
import express from "express";
import mongoose from "mongoose";

const app = express();

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose.connection.once("open", () => {
  console.log("Database Connection Successful");
  app.listen(envConfig.port, () => {
    console.log(`Server is running on PORT ${envConfig.port}`);
  });
});
