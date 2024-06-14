import User from "@models/userModel";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

export const createUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const findUser = await User.findOne({ email: email });

    try {
      if (findUser) {
        res.status(409).json({
          status: 409,
          message: "user with this email already exists",
        });
      } else {
        let newUser = new User(req.body);
        let savedUser = await newUser.save();
        res.status(201).json({
          status: 201,
          message: "account creation successful",
          user: savedUser.toObject(),
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "account creation failed",
        error: error,
      });
    }
  }
);
