import mongoose, { Model, Schema } from "mongoose";
import { IProject } from "./types";

const ContextualContentSchema: Schema = new Schema({
  render_order: { type: Number, required: true },
  type: { type: String, required: true, enum: ["image", "code"] },
  image_uri: { type: String },
  code_content: { type: String },
  explanation: { type: String },
});

const SolutionSchema: Schema = new Schema({
  explanation: { type: String, required: true },
  context: [ContextualContentSchema],
});

const DecisionSchema: Schema = new Schema({
  title: { type: String, required: true },
  problem: {
    title: { type: String, required: true },
    content: {
      intro: { type: String, required: true },
      key_points: [{ type: String, required: true }],
      closing: { type: String, required: true },
    },
  },
  solution: [SolutionSchema],
});

const ProjectSchema: Schema = new Schema({
  project_name: { type: String, required: true },
  project_date: { type: String, required: true },
  project_uri: { type: String, required: true },
  decisions: [DecisionSchema],
});

const Project: Model<IProject> = mongoose.model<IProject>(
  "Project",
  ProjectSchema
);

export default Project;
