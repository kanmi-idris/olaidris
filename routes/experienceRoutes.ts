import {
  createExperience,
  deleteExperience,
  editExperience,
  getAllExperiences,
  getSingleExperience,
} from "@controllers/experienceController";
import { authenticateUser } from "@middlewares/authMiddleware";
import { Router } from "express";

const experienceRouter = Router();

experienceRouter.get("/", authenticateUser, getAllExperiences);
experienceRouter.post("/create", authenticateUser, createExperience);
experienceRouter.get("/:id", authenticateUser, getSingleExperience);
experienceRouter.put("/edit/:id", authenticateUser, editExperience);
experienceRouter.delete("/delete/:id", authenticateUser, deleteExperience);

export default experienceRouter;
