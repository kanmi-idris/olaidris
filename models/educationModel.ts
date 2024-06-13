import mongoose, { Model, Schema } from "mongoose";
import { IEducation } from "./types";

const educationSchema: Schema = new Schema(
  {
    school: {
      type: String,
      required: true,
    },
    programme: {
      type: String,
      required: true,
    },
    location: {
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    duration: {
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
    },
    school_logo_uri: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Education: Model<IEducation> = mongoose.model<IEducation>(
  "Education",
  educationSchema
);

export default Education;
