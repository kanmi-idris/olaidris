import User from "@models/userModel";
import responseHandler from "@utils/responseHandler";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

// Removed the ip field from all documents
// User.updateMany({}, { $unset: { ip: "" } })
//   .then((result) => console.log("IP field removed from all documents:", result))
//   .catch((error) => console.error("Error removing IP field:", error));

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
        responseHandler.sendSuccess(
          res,
          "account creation successful",
          savedUser.toObject(),
          201
        );
      }
    } catch (error) {
      responseHandler.sendError(res, "account creation failed", error, 500);
    }
  }
);
