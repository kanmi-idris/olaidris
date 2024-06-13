import mongoose, { Model, Schema } from "mongoose";
import { IAccolade } from "./types";

const accoladeSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    accolade: {
      type: String,
      required: true,
    },
    date_received: {
      type: Date,
      default: Date.now,
    },
    source_platform: {
      type: String,
      required: false,
    },
    source_uri: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Accolade: Model<IAccolade> = mongoose.model<IAccolade>(
  "Accolade",
  accoladeSchema
);

export default Accolade;
