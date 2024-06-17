import {
  createProject,
  deleteProject,
  editProject,
  getAllProjects,
  getSingleProject,
} from "@controllers/projectsController";
import { authenticateUser } from "@middlewares/authMiddleware";
import { Router } from "express";

const projectsRouter = Router();

projectsRouter.get("/", authenticateUser, getAllProjects);
projectsRouter.post("/create", authenticateUser, createProject);
projectsRouter.get("/:id", authenticateUser, getSingleProject);
projectsRouter.put("/edit/:id", authenticateUser, editProject);
projectsRouter.delete("/delete/:id", authenticateUser, deleteProject);

export default projectsRouter;
