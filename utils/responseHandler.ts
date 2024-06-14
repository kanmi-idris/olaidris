import { Response } from "express";
const responseHandler = {
  sendSuccess: (
    res: Response,
    message: string,
    data: any,
    statusCode: number
  ) => {
    res.status(statusCode).json({
      success: true,
      message: message,
      data: data,
    });
  },

  sendError: (
    res: Response,
    message: string,
    error: unknown,
    statusCode: number
  ) => {
    res.status(statusCode).json({
      success: false,
      message: message,
      error: error,
    });
  },
};

export default responseHandler;
