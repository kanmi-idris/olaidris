import {
  createUpload,
  deleteUpload,
  editUpload,
  getAllUploads,
} from "@controllers/uploadsController";
import { authenticateUser } from "@middlewares/authMiddleware";
import { Router } from "express";

const uploadsRouter = Router();

uploadsRouter.get("/", authenticateUser, getAllUploads);
uploadsRouter.post("/create", authenticateUser, createUpload);
uploadsRouter.put("/edit/:id", authenticateUser, editUpload);
uploadsRouter.delete("/delete/:id", authenticateUser, deleteUpload);
export default uploadsRouter;
