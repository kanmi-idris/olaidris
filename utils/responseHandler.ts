import { Response } from "express";
const responseHandler = {
  sendSuccess: (
    res: Response,
    message: string,
    statusCode: number,
    data?: any
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
    statusCode: number,
    error?: unknown
  ) => {
    res.status(statusCode).json({
      success: false,
      message: message,
      error: error,
    });
  },
};

export default responseHandler;
