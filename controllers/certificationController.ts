import Certification from "@models/certificationModel";
import responseHandler from "@utils/responseHandler";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

export const createCertification = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { sponsor, title, awarding_date } = req.body;

      const existingCertifications = await Certification.find({
        sponsor: sponsor,
        title: title,
        awarding_date: awarding_date,
      });

      const isDuplicate = existingCertifications.some((Certification) => {
        return (
          Certification.awarding_date.getTime() ===
            new Date(awarding_date).getTime() &&
          Certification.sponsor === sponsor &&
          Certification.title === title
        );
      });

      if (isDuplicate) {
        return responseHandler.sendError(
          res,
          "Certification already exists",
          409
        );
      }

      const newCertification = new Certification(req.body);
      await newCertification.save();
      responseHandler.sendSuccess(
        res,
        "Certification created successfully",
        201,
        newCertification
      );
    } catch (error) {
      responseHandler.sendError(
        res,
        "Certification creation failed",
        500,
        error
      );
    }
  }
);

export const getAllCertifications = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const allCertifications = await Certification.find();
      responseHandler.sendSuccess(
        res,
        "Certifications retrieved successfully",
        200,
        allCertifications
      );
    } catch (error) {
      responseHandler.sendError(
        res,
        "Certifications retrieval failed",
        500,
        error
      );
    }
  }
);

export const getSingleCertification = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const singleCertification = await Certification.findById(id);
      responseHandler.sendSuccess(
        res,
        "Certification retrieved successfully",
        200,
        singleCertification
      );
    } catch (error) {
      responseHandler.sendError(
        res,
        "Certification retrieval failed",
        500,
        error
      );
    }
  }
);

export const editCertification = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const CertificationToBeUpdated = await Certification.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        }
      );

      if (!CertificationToBeUpdated) {
        return responseHandler.sendError(res, "Certification not found", 404);
      }
      responseHandler.sendSuccess(
        res,
        "Certification updated successfully",
        200,
        Certification
      );
    } catch (error) {
      responseHandler.sendError(res, "Certification update failed", 500, error);
    }
  }
);

export const deleteCertification = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const CertificationToBeDeleted = await Certification.findByIdAndDelete(
        id
      );
      if (!CertificationToBeDeleted) {
        return responseHandler.sendError(res, "Certification not found", 404);
      }
      responseHandler.sendSuccess(
        res,
        "Certification deleted successfully",
        200
      );
    } catch (error) {
      responseHandler.sendError(
        res,
        "Certification deletion failed",
        500,
        error
      );
    }
  }
);
