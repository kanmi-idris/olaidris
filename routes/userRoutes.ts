// import * as userController from "@controllers/userController";
import { createUser } from "@controllers/userController";
import { Router } from "express";

const userRouter = Router();

// console.log("user Routerssss");
userRouter.post("/create-user", createUser);

// Other routes (currently commented out)
// userRouter.post("/user-login", userController.loginUser);
// userRouter.post("/refresh-token", userController.refreshToken);
// userRouter.delete("/delete-user", userController.deleteUser);
// userRouter.post("/forgot-password", userController.sendOTP);
// userRouter.post("/reset-password", userController.resetPassword);
// userRouter.post("/check-ip/:ip", userController.checkIp);

export default userRouter;
