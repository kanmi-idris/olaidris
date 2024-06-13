require("module-alias/register");
require("dotenv").config();
import connectDB from "@config/dbConfig";
import envConfig from "@config/envConfig";
import accoladesRouter from "@routes/accoladesRoutes";
import certificationsRouter from "@routes/certificationsRoutes";
import educationRouter from "@routes/educationRoutes";
import projectsRouter from "@routes/projectsRoutes";
import userRouter from "@routes/userRoutes";
import cors from "cors";
import express, { Request, Response } from "express";
import { marked } from "marked";
import mongoose from "mongoose";

connectDB();

const app = express();
const fs = require("fs");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setting the Readme file as default screen for the app
app.get("/", (req: Request, res: Response) => {
  const readmePath = path.join(__dirname, "README.md");

  fs.readFile(readmePath, "utf8", (err: any, data: any) => {
    if (err) {
      res.status(500).send("Error reading README file");
      return;
    }
    const htmlContent = marked.parse(data);
    res.send(htmlContent);
  });
});

app.use("/api/user", userRouter);
app.use("/api/certification", certificationsRouter);
app.use("/api/accolades", accoladesRouter);
app.use("/api/education", educationRouter);
app.use("/api/projects", projectsRouter);

mongoose.connection.once("open", () => {
  console.log("Database Connection Successful");
  app.listen(envConfig.port, () => {
    console.log(`Server is running on PORT ${envConfig.port}`);
  });
});
