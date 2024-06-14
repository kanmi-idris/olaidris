// import * as userController from "@controllers/userController";
import { createUser } from "@controllers/userController";
import { validateEmailAndHashPassword } from "@middlewares/authMiddleware";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/create-user", validateEmailAndHashPassword, createUser);

// Other routes (currently commented out)
// userRouter.post("/user-login", userController.loginUser);
// userRouter.post("/refresh-token", userController.refreshToken);
// userRouter.delete("/delete-user", userController.deleteUser);
// userRouter.post("/forgot-password", userController.sendOTP);
// userRouter.post("/reset-password", userController.resetPassword);
// userRouter.post("/check-ip/:ip", userController.checkIp);

export default userRouter;
