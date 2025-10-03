import { ZodObject, ZodRawShape } from "zod";
import catchAsync from "../utils/catchAsync";

const validateRequest = (schema: ZodObject<ZodRawShape>) => {
  return catchAsync(async (req, res, next) => {
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });

    return next();
  });
};

export default validateRequest;
