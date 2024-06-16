import User from "@models/userModel";
import responseHandler from "@utils/responseHandler";
import { decryptToken } from "@utils/tokenGenerator";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const validateEmailAndHashPassword = [
  body("email").isEmail().withMessage("Invalid Email Address"),
  async (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return responseHandler.sendError(
        res,
        "Invalid Email Address",
        400,
        result.array()[0]
      );
    }

    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    next();
  },
];

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];
  if (!accessToken) {
    return responseHandler.sendError(
      res,
      "Unauthorized",
      401,
      "No token provided"
    );
  }

  try {
    let payload = await decryptToken(accessToken, res, "access");

    // console.log("Access token payload: ", payload);
    const currentTime = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < currentTime) {
      // Access token has expired
      res.redirect(`/api/user/refresh-token/${payload.userId}`);
    } else {
      // Access token is still valid
      let user = await User.findById(payload.userId);

      if (user) {
        next();
      } else {
        return responseHandler.sendError(
          res,
          "Unauthorized",
          401,
          "User not found"
        );
      }
    }
  } catch (error) {
    console.error("Token decryption error:", error);
    return responseHandler.sendError(res, "Unauthorized", 401, "Invalid token");
  }
};
