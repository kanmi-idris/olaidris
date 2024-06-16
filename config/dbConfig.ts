import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Database Connection In Progress");
    await mongoose.connect(`${process.env.DATABASE_URL}`);
  } catch (err) {
    console.error(err);
    console.log("Database Connection Failed:", err);
  }
};

export default connectDB;
