import { RequestHandler } from "express";
import httpStatus from "http-status";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const notFound: RequestHandler = (req, res, next) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    error: "",
  });
};

export default notFound;
