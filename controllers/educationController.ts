import Education from "@models/educationModel";
import responseHandler from "@utils/responseHandler";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

export const createEducation = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { school, programme, duration } = req.body;
      const startDate = new Date(duration.startDate);

      const existingEducations = await Education.find({
        school: school,
        programme: programme,
      });

      const isDuplicate = existingEducations.some((education) => {
        const existingStartDate = new Date(education.duration.startDate);
        return existingStartDate.getMonth() === startDate.getMonth();
      });

      if (isDuplicate) {
        return responseHandler.sendError(res, "Education already exists", 409);
      }

      const newEducation = new Education(req.body);
      await newEducation.save();
      responseHandler.sendSuccess(
        res,
        "Education created successfully",
        201,
        newEducation
      );
    } catch (error) {
      responseHandler.sendError(res, "Education creation failed", 500, error);
    }
  }
);

export const getAllEducations = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const allEducations = await Education.find();
      responseHandler.sendSuccess(
        res,
        "Educations retrieved successfully",
        200,
        allEducations
      );
    } catch (error) {
      responseHandler.sendError(res, "Educations retrieval failed", 500, error);
    }
  }
);

export const getSingleEducation = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const singleEducation = await Education.findById(id);
      responseHandler.sendSuccess(
        res,
        "Education retrieved successfully",
        200,
        singleEducation
      );
    } catch (error) {
      responseHandler.sendError(res, "Education retrieval failed", 500, error);
    }
  }
);

export const editEducation = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const education = await Education.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!education) {
        return responseHandler.sendError(res, "Education not found", 404);
      }
      responseHandler.sendSuccess(
        res,
        "Education updated successfully",
        200,
        education
      );
    } catch (error) {
      responseHandler.sendError(res, "Education update failed", 500, error);
    }
  }
);

export const deleteEducation = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const education = await Education.findByIdAndDelete(id);
      if (!education) {
        return responseHandler.sendError(res, "Education not found", 404);
      }
      responseHandler.sendSuccess(res, "Education deleted successfully", 200);
    } catch (error) {
      responseHandler.sendError(res, "Education deletion failed", 500, error);
    }
  }
);
