import {
  createAccolade,
  deleteAccolade,
  editAccolade,
  getAllAccolades,
  getSingleAccolade,
} from "@controllers/accoladesController";
import { authenticateUser } from "@middlewares/authMiddleware";
import { Router } from "express";

const accoladesRouter = Router();

accoladesRouter.get("/", authenticateUser, getAllAccolades);
accoladesRouter.post("/create", authenticateUser, createAccolade);
accoladesRouter.get("/:id", authenticateUser, getSingleAccolade);
accoladesRouter.put("/edit/:id", authenticateUser, editAccolade);
accoladesRouter.delete("/delete/:id", authenticateUser, deleteAccolade);
export default accoladesRouter;
