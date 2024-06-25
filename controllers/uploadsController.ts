import { IUpload } from "@models/types";
import Upload from "@models/uploadsModel";
import responseHandler from "@utils/responseHandler";
import { v2 as cloudinary } from "cloudinary";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

export const createUpload = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      if (!req.files) {
        return responseHandler.sendError(res, "No files uploaded", 400);
      }

      const uploads: IUpload[] = [];
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      // Handle images
      if (files.images) {
        for (const file of files.images) {
          const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "image",
            folder: "olaidris portfolio",
            transformation: [
              {
                fetch_format: "auto",
                dpr: "auto",
                responsive: true,
                width: "auto",
                quality: "auto",
              },
            ],
          });

          const existingUpload = await Upload.findOne({
            type: "image",
            filename: result.public_id,
            uri: result.secure_url,
          });

          if (!existingUpload) {
            const newUpload = new Upload({
              type: "image",
              filename: result.public_id,
              uri: result.secure_url,
            });
            await newUpload.save();
            uploads.push(newUpload);
          }
        }
      }

      // Handle videos
      if (files.videos) {
        for (const file of files.videos) {
          const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "video",
            folder: "olaidris portfolio",
            transformation: [
              {
                fetch_format: "auto",
                dpr: "auto",
                responsive: true,
                width: "auto",
                quality: "auto",
              },
            ],
          });

          const existingUpload = await Upload.findOne({
            type: "video",
            filename: result.public_id,
            uri: result.secure_url,
          });

          if (!existingUpload) {
            const newUpload = new Upload({
              type: "video",
              filename: result.public_id,
              uri: result.secure_url,
            });
            await newUpload.save();
            uploads.push(newUpload);
          }
        }
      }

      responseHandler.sendSuccess(
        res,
        (files.images
          ? `${files.images.length} images`
          : `${files.videos.length} video`) +
          ` has been successfully uploaded `,
        201,
        uploads
      );
    } catch (error) {
      responseHandler.sendError(res, `Upload creation failed`, 500, error);
    }
  }
);

export const getAllUploads = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const allUploads = await Upload.find();
      responseHandler.sendSuccess(
        res,
        "Uploads retrieved successfully",
        200,
        allUploads
      );
    } catch (error) {
      responseHandler.sendError(res, "Uploads retrieval failed", 500, error);
    }
  }
);

// export const getSingleUpload = expressAsyncHandler(
//   async (req: Request, res: Response) => {
//     try {
//       const { id } = req.params;
//       const singleUpload = await Upload.findById(id);
//       responseHandler.sendSuccess(
//         res,
//         "Upload retrieved successfully",
//         200,
//         singleUpload
//       );
//     } catch (error) {
//       responseHandler.sendError(res, "Upload retrieval failed", 500, error);
//     }
//   }
// );

// export const editUpload = expressAsyncHandler(
//   async (req: Request, res: Response) => {
//     try {
//       const { id } = req.params;
//       const existingUpload = await Upload.findById(id);

//       if (!existingUpload) {
//         return responseHandler.sendError(res, "Upload not found", 404);
//       }

//       if (req.files) {
//         const files = req.files as {
//           [fieldname: string]: Express.Multer.File[];
//         };

//         // Handle images
//         if (files.images) {
//           for (const file of files.images) {
//             const result = await cloudinary.uploader.upload(file.path, {
//               resource_type: "image",
//               folder: "olaidris portfolio",
//               transformation: [
//                 {
//                   fetch_format: "auto",
//                   dpr: "auto",
//                   responsive: true,
//                   width: "auto",
//                   quality: "auto",
//                   background: "gen_fill",
//                 },
//               ],
//             });

//             existingUpload.type = "image";
//             existingUpload.filename = result.original_filename;
//             existingUpload.uri = result.secure_url;
//             await existingUpload.save();
//           }
//         }

//         // Handle videos
//         if (files.videos) {
//           for (const file of files.videos) {
//             const result = await cloudinary.uploader.upload(file.path, {
//               resource_type: "video",
//               folder: "olaidris portfolio",
//               transformation: [
//                 {
//                   fetch_format: "auto",
//                   dpr: "auto",
//                   responsive: true,
//                   width: "auto",
//                   quality: "auto",
//                   background: "gen_fill",
//                 },
//                 // Add video-specific transformations here
//                 // e.g., cropping, resizing, etc.
//               ],
//             });

//             existingUpload.type = "video";
//             existingUpload.filename = result.original_filename;
//             existingUpload.uri = result.secure_url;
//             await existingUpload.save();
//           }
//         }
//       }

//       responseHandler.sendSuccess(
//         res,
//         "Upload updated successfully",
//         200,
//         existingUpload
//       );
//     } catch (error) {
//       responseHandler.sendError(res, "Upload update failed", 500, error);
//     }
//   }
// );

export const deleteUpload = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const UploadToBeDeleted = await Upload.findByIdAndDelete(id);

      if (!UploadToBeDeleted) {
        return responseHandler.sendError(res, "Upload not found", 404);
      }

      // Delete from Cloudinary
      await cloudinary.uploader.destroy(UploadToBeDeleted.filename, {
        resource_type: UploadToBeDeleted.type,
      });

      responseHandler.sendSuccess(res, "Upload deleted successfully", 200);
    } catch (error) {
      responseHandler.sendError(res, "Upload deletion failed", 500, error);
    }
  }
);
