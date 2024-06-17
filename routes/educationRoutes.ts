import {
  createEducation,
  deleteEducation,
  editEducation,
  getAllEducations,
  getSingleEducation,
} from "@controllers/educationController";
import { authenticateUser } from "@middlewares/authMiddleware";
import { Router } from "express";

const educationRouter = Router();

educationRouter.get("/", authenticateUser, getAllEducations);
educationRouter.post("/create", authenticateUser, createEducation);
educationRouter.get("/:id", authenticateUser, getSingleEducation);
educationRouter.put("/edit/:id", authenticateUser, editEducation);
educationRouter.delete("/delete/:id", authenticateUser, deleteEducation);

export default educationRouter;
