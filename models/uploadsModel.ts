import mongoose, { Model, Schema } from "mongoose";
import { IUpload } from "./types";

const UploadSchema: Schema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["image", "video"],
    },
    uri: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Upload: Model<IUpload> = mongoose.model<IUpload>("Upload", UploadSchema);

export default Upload;
