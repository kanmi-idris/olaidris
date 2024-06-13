import mongoose, { Model, Schema } from "mongoose";
import { ICertificate } from "./types";

const certificateSchema: Schema = new Schema(
  {
    sponsor: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    awarding_date: {
      type: Date,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    logo_uri: {
      type: String,
      required: false,
    },
    proof_uri: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Certificate: Model<ICertificate> = mongoose.model<ICertificate>(
  "Certificate",
  certificateSchema
);

export default Certificate;
