import responseHandler from "@utils/responseHandler";
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
        result.array()[0],
        400
      );
    }

    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(hashedPassword);
    req.body.password = hashedPassword;
    next();
  },
];
