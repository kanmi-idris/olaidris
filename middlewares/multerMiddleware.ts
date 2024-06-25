import responseHandler from "@utils/responseHandler";
import { NextFunction, Request, Response } from "express";
import multer, { MulterError } from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const multerUpload = multer({ storage: storage });

const multerCheck = [
  multerUpload.fields([
    { name: "images", maxCount: 10 }, // Allow up to 10 images
    { name: "videos", maxCount: 5 }, // Allow up to 5 videos
  ]),

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.files) {
        const files = req.files as {
          [fieldname: string]: Express.Multer.File[];
        };
        if (files.images && files.images.length > 10) {
          return responseHandler.sendError(
            res,
            "Upload limit for images exceeded. You can upload a maximum of 10 images.",
            400
          );
        } else if (files.videos && files.videos.length > 5) {
          return responseHandler.sendError(
            res,
            "Upload limit for videos exceeded. You can upload a maximum of 5 videos.",
            400
          );
        }
      } else {
        return responseHandler.sendError(res, "No files were uploaded.", 400);
      }

      next();
    } catch (error: MulterError | unknown) {
      console.error(error);
      // Handle MulterError: Unexpected field
      if (error instanceof MulterError) {
        if (error.message.includes("MulterError: Unexpected field")) {
          return responseHandler.sendError(
            res,
            "Invalid file upload. Please check your request field, only field 'images' and 'videos' are allowed.",
            400
          );
        } else if (error.code === "LIMIT_FILE_SIZE") {
          return responseHandler.sendError(
            res,
            "File size exceeds the maximum limit of 10MB.",
            400
          );
        } else {
          // Handle other potential errors
          return responseHandler.sendError(
            res,
            "File upload failed",
            500,
            error
          );
        }
      } else {
        return responseHandler.sendError(
          res,
          "An error occurred during file upload.",
          500
        );
      }
    }
  },
];

export default multerCheck;
