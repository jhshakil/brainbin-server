/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TAuth, TLoginUser } from "./auth.interface";
import config from "../../config";
import { Auth } from "./auth.modal";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { sendEmail } from "../../utils/emailSender";
import { createToken, verifyToken } from "./auth.utils";
import { id } from "zod/v4/locales";

const createUserIntoDB = async (payload: TAuth) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // create a user (transaction-1)
    const auth = await Auth.create([payload], { session });

    //create a student
    if (!auth.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    const jwtPayload = {
      id: auth[0]._id,
      email: payload.email,
      name: auth[0].name,
      role: auth[0].role,
    };
    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string
    );

    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string
    );

    await session.commitTransaction();
    await session.endSession();

    return { accessToken, refreshToken, user: auth[0] };
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getAllUsers = async () => {
  const users = await Auth.find({ role: { $ne: "superAdmin" } });
  return users;
};

const getSingleUser = async (id: string) => {
  const user = await Auth.findById(id);
  return user;
};

const updateUserRole = async (id: string, role: string) => {
  const user = await Auth.findByIdAndUpdate(id, { role }, { new: true });
  return user;
};

const loginUser = async (payload: TLoginUser) => {
  const user = await Auth.isUserExist(payload.email);

  if (!user)
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");

  if (!(await Auth.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, "This password is not matched!");

  // create token and send to the client
  const jwtPayload = {
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return { accessToken, refreshToken, user };
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { email } = decoded;

  // checking if the user is exist
  const user = await Auth.isUserExist(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  const jwtPayload = {
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};

const forgetPassword = async (payload: { email: string }) => {
  const user = await Auth.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found");
  }

  const jwtPayload = {
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    "2min"
  );

  await sendEmail(
    user.email,
    `<p><a href="${config.frontend_url}/reset-password?key=${accessToken}">Click here</a> to forget password </p>`,
    `Spoon Sync Forget Password`
  );

  return user;
};

const resetPassword = async (payload: { email: string; password: string }) => {
  const newPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds)
  );
  const user = Auth.findOneAndUpdate(
    { email: payload.email },
    { password: newPassword }
  );

  return user;
};

export const AuthServices = {
  createUserIntoDB,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  loginUser,
  refreshToken,
  forgetPassword,
  resetPassword,
};
