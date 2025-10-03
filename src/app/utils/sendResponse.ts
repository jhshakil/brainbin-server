import { Response } from "express";
import httpStatus from "http-status";

type TResponse<T> = {
  success?: boolean;
  statusCode?: number;
  message?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  const { success = true, statusCode = httpStatus.OK, message } = data;
  res.status(statusCode).json({
    success,
    statusCode,
    message,
    data: data.data,
  });
};

export default sendResponse;
