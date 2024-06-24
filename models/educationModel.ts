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
        type: Schema.Types.Mixed, // Allow both Date and String
        required: true,
        validate: {
          validator: function (v: Date | string) {
            // Checking if the value is a Date or 'expected'
            return !isNaN(Date.parse(v as string)) || v === "expected";
          },
          message: (props: { value: Date | string }) =>
            `${props.value} is not a valid end date!`,
        },
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
