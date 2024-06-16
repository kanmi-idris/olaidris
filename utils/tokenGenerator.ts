import { IUser } from "@models/types";
import { createPrivateKey, createPublicKey } from "crypto";
import { Response } from "express";
import { EncryptJWT, jwtDecrypt } from "jose";
import responseHandler from "./responseHandler";

export const generateEncryptedToken = async (
  user: IUser,
  tokenType: "access" | "refresh"
) => {
  let payload = {
    userId: user._id,
    email: user.email,
    googleId: user.googleId,
    refreshToken: user.refreshToken,
  };

  const publicKey = process.env.JWT_PUBLIC_KEY;
  if (!publicKey) {
    throw new Error(
      "JWT_PUBLIC_KEY is not defined in the environment variables"
    );
  }

  try {
    const publicKeyObject = createPublicKey({
      key: publicKey,
      format: "pem",
      type: "spki",
    });

    // Setting expiration time based on token type
    const expirationTime = tokenType === "access" ? "2h" : "2d";

    const encryptedToken = await new EncryptJWT(payload)
      .setProtectedHeader({ alg: "RSA-OAEP", enc: "A256GCM" })
      .setExpirationTime(expirationTime)
      .encrypt(publicKeyObject);

    return encryptedToken;
  } catch (error) {
    console.error("Error creating token:", error);
    throw new Error("Failed to create token");
  }
};

export const decryptToken = async (
  token: string,
  res?: Response,
  tokenType?: "access" | "refresh"
) => {
  let privateKey = process.env.JWT_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error(
      "JWT_PRIVATE_KEY is not defined in the environment variables"
    );
  }

  try {
    const privateKeyObject = createPrivateKey({
      key: privateKey,
      format: "pem",
      type: "pkcs8",
      passphrase: process.env.JWT_KEYPAIR_GENERATION_PASSPHRASE,
    });

    const { payload } = await jwtDecrypt(token, privateKeyObject);
    return payload;
  } catch (error) {
    if (error instanceof Error && error.name === "JWTExpired") {
      if (res) {
        responseHandler.sendError(
          res,
          `${error.name}: Error decrypting ${tokenType} token`,
          401,
          error
        );
      }
      throw new Error("JWTExpiredError");
    } else {
      throw new Error("Failed to decrypt token");
    }
  }
};
