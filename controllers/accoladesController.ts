import Accolade from "@models/accoladesModel";
import responseHandler from "@utils/responseHandler";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

export const createAccolade = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { name, accolade, date_received } = req.body;

      const existingAccolades = await Accolade.find({
        name: name,
        accolade: accolade,
        date_received: date_received,
      });

      const isDuplicate = existingAccolades.some((Accolade) => {
        return (
          Accolade.date_received.getTime() ===
            new Date(date_received).getTime() &&
          Accolade.name === name &&
          Accolade.accolade === accolade
        );
      });

      if (isDuplicate) {
        return responseHandler.sendError(res, "Accolade already exists", 409);
      }

      const newAccolade = new Accolade(req.body);
      await newAccolade.save();
      responseHandler.sendSuccess(
        res,
        "Accolade created successfully",
        201,
        newAccolade
      );
    } catch (error) {
      responseHandler.sendError(res, "Accolade creation failed", 500, error);
    }
  }
);

export const getAllAccolades = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const allAccolades = await Accolade.find();
      responseHandler.sendSuccess(
        res,
        "Accolades retrieved successfully",
        200,
        allAccolades
      );
    } catch (error) {
      responseHandler.sendError(res, "Accolades retrieval failed", 500, error);
    }
  }
);

export const getSingleAccolade = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const singleAccolade = await Accolade.findById(id);
      responseHandler.sendSuccess(
        res,
        "Accolade retrieved successfully",
        200,
        singleAccolade
      );
    } catch (error) {
      responseHandler.sendError(res, "Accolade retrieval failed", 500, error);
    }
  }
);

export const editAccolade = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const AccoladeToBeUpdated = await Accolade.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        }
      );

      if (!AccoladeToBeUpdated) {
        return responseHandler.sendError(res, "Accolade not found", 404);
      }
      responseHandler.sendSuccess(
        res,
        "Accolade updated successfully",
        200,
        Accolade
      );
    } catch (error) {
      responseHandler.sendError(res, "Accolade update failed", 500, error);
    }
  }
);

export const deleteAccolade = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const AccoladeToBeDeleted = await Accolade.findByIdAndDelete(id);
      if (!AccoladeToBeDeleted) {
        return responseHandler.sendError(res, "Accolade not found", 404);
      }
      responseHandler.sendSuccess(res, "Accolade deleted successfully", 200);
    } catch (error) {
      responseHandler.sendError(res, "Accolade deletion failed", 500, error);
    }
  }
);
