/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from "mongoose";
import { AuthModel, TAuth } from "./auth.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const authSchema = new Schema<TAuth>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    passwordChangedAt: { type: Date },
    role: {
      type: String,
      enum: ["superAdmin", "admin", "user"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

authSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
authSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

authSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

// Modify toJSON method to remove the password
authSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

authSchema.statics.isUserExist = async function (email: string) {
  return Auth.findOne({ email }).select("+password");
};

authSchema.statics.isPasswordMatched = async function (
  password: string,
  hashedPassword: string
) {
  return await bcrypt.compare(password, hashedPassword);
};

export const Auth = model<TAuth, AuthModel>("Auth", authSchema);
