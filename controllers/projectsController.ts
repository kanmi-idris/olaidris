import Project from "@models/projectsModel";
import responseHandler from "@utils/responseHandler";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

export const createProject = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { project_name, project_uri, project_date } = req.body;

      const existingProjects = await Project.find({
        project_name: project_name,
        project_uri: project_uri,
        project_date: project_date,
      });

      const isDuplicate = existingProjects.some((Project) => {
        return (
          new Date(Project.project_date) === new Date(project_date) &&
          Project.project_name === project_name &&
          Project.project_uri === project_uri
        );
      });

      if (isDuplicate) {
        return responseHandler.sendError(res, "Project already exists", 409);
      }

      const newProject = new Project(req.body);
      await newProject.save();
      responseHandler.sendSuccess(res, "Project created successfully", 201);
    } catch (error) {
      responseHandler.sendError(res, "Project creation failed", 500, error);
    }
  }
);

export const getAllProjects = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const allProjects = await Project.find();
      responseHandler.sendSuccess(
        res,
        "Projects retrieved successfully",
        200,
        allProjects
      );
    } catch (error) {
      responseHandler.sendError(res, "Projects retrieval failed", 500, error);
    }
  }
);

export const getSingleProject = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const singleProject = await Project.findById(id);
      responseHandler.sendSuccess(
        res,
        "Project retrieved successfully",
        200,
        singleProject
      );
    } catch (error) {
      responseHandler.sendError(res, "Project retrieval failed", 500, error);
    }
  }
);

export const editProject = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const newProject = await Project.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!newProject) {
        return responseHandler.sendError(res, "Project not found", 404);
      }
      responseHandler.sendSuccess(
        res,
        "Project updated successfully",
        200,
        Project
      );
    } catch (error) {
      responseHandler.sendError(res, "Project update failed", 500, error);
    }
  }
);

export const deleteProject = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const currentProject = await Project.findByIdAndDelete(id);
      if (!currentProject) {
        return responseHandler.sendError(res, "Project not found", 404);
      }
      responseHandler.sendSuccess(res, "Project deleted successfully", 200);
    } catch (error) {
      responseHandler.sendError(res, "Project deletion failed", 500, error);
    }
  }
);
