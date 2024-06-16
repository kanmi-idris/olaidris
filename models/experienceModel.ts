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
        type: Schema.Types.Mixed, // Allow both Date and String
        required: true,
        validate: {
          validator: function (v: any) {
            // Checking if the value is a Date or 'present'
            return !isNaN(Date.parse(v)) || v === "present";
          },
          message: (props: { value: any }) =>
            `${props.value} is not a valid end date!`,
        },
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
