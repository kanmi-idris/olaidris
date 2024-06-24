import User from "@models/userModel";
import responseHandler from "@utils/responseHandler";
import { decryptToken, generateEncryptedToken } from "@utils/tokenGenerator";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

// This will delete all documents where the `ip` field exists
// User.deleteMany({ ip: { $exists: true } })
//   .then((result) => console.log("Documents deleted:", result))
//   .catch((error) => console.error("Error deleting documents:", error));

export const createUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const findUser = await User.findOne({ email: email });

    try {
      if (findUser) {
        responseHandler.sendError(
          res,
          "user with this email already exists",
          409
        );
      } else {
        const newUser = new User(req.body);
        newUser.refreshToken = await generateEncryptedToken(newUser, "refresh");

        const savedUser = await newUser.save();
        responseHandler.sendSuccess(
          res,
          "account creation successful",
          201,
          savedUser.toObject()
        );
      }
    } catch (error) {
      responseHandler.sendError(res, "account creation failed", 500, error);
    }
  }
);

export const loginUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { email, password, googleId } = req.body;

    // Find the user by Google ID or email
    const findUser = await User.findOne(
      googleId ? { googleId: googleId } : { email: email }
    );

    if (findUser) {
      const userDetails = findUser.toObject();

      const accessToken = await generateEncryptedToken(findUser, "access");
      userDetails.accessToken = accessToken;

      if (googleId) {
        responseHandler.sendSuccess(
          res,
          "login with google successful",
          200,
          userDetails
        );
      } else {
        // If logging in with email, compare the password
        bcrypt.compare(password, findUser.password, (err, result) => {
          if (err || !result) {
            responseHandler.sendError(
              res,
              "login failed: incorrect password",
              401,
              err || "Incorrect password"
            );
          } else {
            responseHandler.sendSuccess(
              res,
              "login successful",
              200,
              userDetails
            );
          }
        });
      }
    } else {
      responseHandler.sendError(
        res,
        "login failed: user does not exist",
        401,
        "User does not exist"
      );
    }
  }
);

export const deleteUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const findUser = await User.findById(id);

    if (findUser) {
      await findUser.deleteOne();
      responseHandler.sendSuccess(
        res,
        "user deleted successfully",
        200,
        findUser.toObject()
      );
    } else {
      responseHandler.sendError(res, "user not found", 404, "User not found");
    }
  }
);

export const refreshToken = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (user && user.refreshToken) {
      const refreshTokenPayload = await decryptToken(
        user.refreshToken,
        res,
        "refresh"
      );

      if (refreshTokenPayload.exp && refreshTokenPayload.exp > currentTime) {
        // Refresh token is valid, issue a new access token
        const newAccessToken = await generateEncryptedToken(user, "access");
        const updatedUser = user.toObject();
        updatedUser.accessToken = newAccessToken;

        res.setHeader("Authorization", `Bearer ${newAccessToken}`);
        responseHandler.sendSuccess(
          res,
          "refresh token successful",
          200,
          updatedUser
        );

        const newRefreshToken = await generateEncryptedToken(user, "refresh");
        user.refreshToken = newRefreshToken;
        await user.save();

        // next();
      } else {
        // Refresh token is invalid or expired
        return responseHandler.sendError(
          res,
          "Unauthorized",
          401,
          "Refresh token is invalid or has expired"
        );
      }
    } else {
      // User not found or refresh token not present
      return responseHandler.sendError(
        res,
        "Unauthorized",
        401,
        "User not found or no refresh token"
      );
    }
  }
);

export const resetPassword = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      responseHandler.sendError(res, "User not found", 404, "User not found");
    } else {
      user.password = password;
      await user.save();
      responseHandler.sendSuccess(
        res,
        "Password reset successful",
        200,
        user.toObject()
      );
    }
  }
);
