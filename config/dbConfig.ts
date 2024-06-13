import mongoose from "mongoose";
import envConfig from "./envConfig";

const connectDB = async () => {
  try {
    console.log("Database Connection In Progress");
    await mongoose.connect(`${envConfig.dbURL}`);
  } catch (err) {
    console.error(err);
    console.log("Database Connection Failed:", err);
  }
};

export default connectDB;
