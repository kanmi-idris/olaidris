import mongoose, { Model, Schema } from "mongoose";
import { ICertificate } from "./types";

const certificationSchema: Schema = new Schema(
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

const Certification: Model<ICertificate> = mongoose.model<ICertificate>(
  "Certification",
  certificationSchema
);

export default Certification;
