import mongoose, { Model, Schema } from "mongoose";
import { IExperience } from "./types";

const experienceSchema: Schema = new Schema(
  {
    company: {
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
    title: {
      type: String,
      required: true,
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
    achievements: [
      {
        type: String,
      },
    ],
    company_logo_uri: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Experience: Model<IExperience> = mongoose.model<IExperience>(
  "Experience",
  experienceSchema
);

export default Experience;
