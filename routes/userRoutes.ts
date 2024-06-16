// import * as userController from "@controllers/userController";
import {
  createUser,
  deleteUser,
  loginUser,
  refreshToken,
  resetPassword,
} from "@controllers/userController";
import {
  authenticateUser,
  validateEmailAndHashPassword,
} from "@middlewares/authMiddleware";
import { Router } from "express";
import { body } from "express-validator";

const userRouter = Router();

userRouter.post("/create-user", validateEmailAndHashPassword, createUser);
userRouter.post(
  "/user-login",
  body("email").isEmail().withMessage("Invalid Email Address"),
  loginUser
);
userRouter.delete("/delete-user/:id", authenticateUser, deleteUser);
userRouter.post("/refresh-token/:id", refreshToken);
// userRouter.post("/forgot-password", userController.sendOTP);
userRouter.post("/reset-password", validateEmailAndHashPassword, resetPassword);

export default userRouter;
