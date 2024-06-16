import { generateKeyPair } from "crypto";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

const dotenvFile = path.join(__dirname, "..", "..", ".env");

// Load existing .env file
dotenv.config({ path: dotenvFile });

generateKeyPair(
  "rsa",
  {
    modulusLength: 4096,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
      cipher: "aes-256-cbc",
      passphrase: process.env.JWT_KEYPAIR_GENERATION_PASSPHRASE,
    },
  },
  (
    err: NodeJS.ErrnoException | null,
    publicKey: string,
    privateKey: string
  ) => {
    if (err) {
      console.error("Error generating keys:", err);
      return;
    }

    // Append or update keys in .env file
    const envContents = fs.readFileSync(dotenvFile, "utf8");
    let envVars = dotenv.parse(envContents);

    envVars["JWT_PUBLIC_KEY"] = publicKey;
    envVars["JWT_PRIVATE_KEY"] = privateKey;

    // Convert envVars back to string
    const newEnvContents = Object.entries(envVars)
      .map(([key, value]) => `${key}="${value}"`)
      .join("\n");

    // Write back to .env file
    fs.writeFileSync(dotenvFile, newEnvContents);
  }
);
