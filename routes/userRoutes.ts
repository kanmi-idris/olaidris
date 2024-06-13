import { Request, Response, Router } from "express";

const userRouter = Router();

userRouter.post("/register", (req: Request, res: Response) => {
  // userController.registerUser(req, res);
  console.log(req, res);
});

userRouter.post("/login", (req: Request, res: Response) => {
  // userController.loginUser(req, res);
  console.log(req, res);
});

userRouter.post("/refresh-token", (req: Request, res: Response) => {
  // userController.refreshToken(req, res);
  console.log(req, res);
});

userRouter.delete("/delete-user", (req: Request, res: Response) => {
  // userController.deleteUser(req, res);
  console.log(req, res);
});

userRouter.post("/forgot-password", (req: Request, res: Response) => {
  // userController.sendOTP(req, res);
  console.log(req, res);
});

userRouter.post("/reset-password", (req: Request, res: Response) => {
  // userController.resetPassword(req, res);
  console.log(req, res);
});

export default userRouter;
