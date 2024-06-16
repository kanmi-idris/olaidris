import Experience from "@models/experienceModel";
import responseHandler from "@utils/responseHandler";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

export const createExperience = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { company, title, duration } = req.body;
      const startDate = new Date(duration.startDate);

      const existingExperiences = await Experience.find({
        company: company,
        title: title,
      });

      const isDuplicate = existingExperiences.some((experience) => {
        const existingStartDate = new Date(experience.duration.startDate);
        return existingStartDate.getMonth() === startDate.getMonth();
      });

      if (isDuplicate) {
        return responseHandler.sendError(res, "Experience already exists", 409);
      }

      const newExperience = new Experience(req.body);
      await newExperience.save();
      responseHandler.sendSuccess(res, "Experience created successfully", 201);
    } catch (error) {
      responseHandler.sendError(res, "Experience creation failed", 500, error);
    }
  }
);

export const getAllExperiences = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const allExperiences = await Experience.find();
      responseHandler.sendSuccess(
        res,
        "Experiences retrieved successfully",
        200,
        allExperiences
      );
    } catch (error) {
      responseHandler.sendError(
        res,
        "Experiences retrieval failed",
        500,
        error
      );
    }
  }
);

export const getSingleExperience = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const singleExperience = await Experience.findById(id);
      responseHandler.sendSuccess(
        res,
        "Experience retrieved successfully",
        200,
        singleExperience
      );
    } catch (error) {
      responseHandler.sendError(res, "Experience retrieval failed", 500, error);
    }
  }
);

export const editExperience = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const experience = await Experience.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!experience) {
        return responseHandler.sendError(res, "Experience not found", 404);
      }
      responseHandler.sendSuccess(
        res,
        "Experience updated successfully",
        200,
        experience
      );
    } catch (error) {
      responseHandler.sendError(res, "Experience update failed", 500, error);
    }
  }
);

export const deleteExperience = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const experience = await Experience.findByIdAndDelete(id);
      if (!experience) {
        return responseHandler.sendError(res, "Experience not found", 404);
      }
      responseHandler.sendSuccess(res, "Experience deleted successfully", 200);
    } catch (error) {
      responseHandler.sendError(res, "Experience deletion failed", 500, error);
    }
  }
);
