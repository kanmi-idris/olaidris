import {
  createUpload,
  deleteUpload,
  getAllUploads,
} from "@controllers/uploadsController";
import { authenticateUser } from "@middlewares/authMiddleware";
import multerCheck from "@middlewares/multerMiddleware";
import { Router } from "express";

const uploadsRouter = Router();

uploadsRouter.get("/", authenticateUser, getAllUploads);
uploadsRouter.post("/create", authenticateUser, multerCheck, createUpload);
// uploadsRouter.put("/edit/:id", authenticateUser, editUpload);
uploadsRouter.delete("/delete/:id", authenticateUser, deleteUpload);
export default uploadsRouter;
