import {
  createCertification,
  deleteCertification,
  editCertification,
  getAllCertifications,
  getSingleCertification,
} from "@controllers/certificationController";
import { authenticateUser } from "@middlewares/authMiddleware";
import { Router } from "express";

const certificationsRouter = Router();

certificationsRouter.get("/", authenticateUser, getAllCertifications);
certificationsRouter.post("/create", authenticateUser, createCertification);
certificationsRouter.get("/:id", authenticateUser, getSingleCertification);
certificationsRouter.put("/edit/:id", authenticateUser, editCertification);
certificationsRouter.delete(
  "/delete/:id",
  authenticateUser,
  deleteCertification
);

export default certificationsRouter;
