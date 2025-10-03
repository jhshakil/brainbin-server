import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .min(6, "Password can not be less than 6 characters")
      .max(20, "Password can not be more than 20 characters"),
    role: z.enum(["superAdmin", "admin", "user"]).optional(),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string().min(1, "Refresh token is required!"),
  }),
});

export const AuthValidations = {
  createUserValidationSchema,
  loginValidationSchema,
  refreshTokenValidationSchema,
};
