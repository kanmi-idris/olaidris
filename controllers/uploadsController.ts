import Upload from "@models/uploadsModel";
import responseHandler from "@utils/responseHandler";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

export const createUpload = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { type, uri } = req.body;

      const existingUploads = await Upload.find({
        type: type,
        uri: uri,
      });

      const isDuplicate = existingUploads.some((Upload) => {
        return Upload.uri === uri && Upload.type === type;
      });

      if (isDuplicate) {
        return responseHandler.sendError(
          res,
          `${type} upload already exists`,
          409
        );
      }

      const newUpload = new Upload(req.body);
      await newUpload.save();
      responseHandler.sendSuccess(
        res,
        `${type} upload created successfully`,
        201,
        newUpload
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

export const getSingleUpload = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const singleUpload = await Upload.findById(id);
      responseHandler.sendSuccess(
        res,
        "Upload retrieved successfully",
        200,
        singleUpload
      );
    } catch (error) {
      responseHandler.sendError(res, "Upload retrieval failed", 500, error);
    }
  }
);

export const editUpload = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const UploadToBeUpdated = await Upload.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!UploadToBeUpdated) {
        return responseHandler.sendError(res, "Upload not found", 404);
      }
      responseHandler.sendSuccess(
        res,
        "Upload updated successfully",
        200,
        Upload
      );
    } catch (error) {
      responseHandler.sendError(res, "Upload update failed", 500, error);
    }
  }
);

export const deleteUpload = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const UploadToBeDeleted = await Upload.findByIdAndDelete(id);
      if (!UploadToBeDeleted) {
        return responseHandler.sendError(res, "Upload not found", 404);
      }
      responseHandler.sendSuccess(res, "Upload deleted successfully", 200);
    } catch (error) {
      responseHandler.sendError(res, "Upload deletion failed", 500, error);
    }
  }
);
