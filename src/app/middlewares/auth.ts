/* eslint-disable @typescript-eslint/no-namespace */
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import { TRole } from "../modules/auth/auth.interface";
import { Auth } from "../modules/auth/auth.modal";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

const auth = (...requiredRoles: TRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // check if the token is send from the client
    if (!token)
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route"
      );

    // check if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    //   checking if the user is exist
    const user = await Auth.isUserExist(decoded?.email);

    if (!user)
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
    if (requiredRoles && !requiredRoles.includes(decoded?.role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route"
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
