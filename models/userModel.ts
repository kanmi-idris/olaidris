import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "./types";

const userSchema: Schema = new Schema(
  {
    googleId: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
