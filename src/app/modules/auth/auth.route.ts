import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthControllers } from "./auth.controller";
import { AuthValidations } from "./auth.validation";
import auth from "../../middlewares/auth";
import { AUTH_ROLE } from "./auth.constant";

const router: Router = Router();

router.post(
  "/create-user",
  validateRequest(AuthValidations.createUserValidationSchema),
  AuthControllers.createUser
);

router.get("/users", AuthControllers.getAllUsers);

router.get("/users/:id", AuthControllers.getSingleUser);

router.patch(
  "/users/:id/role",
  auth(AUTH_ROLE.admin, AUTH_ROLE.superAdmin),
  AuthControllers.updateUserRole
);

router.patch(
  "/users/:id/status",
  auth(AUTH_ROLE.admin, AUTH_ROLE.superAdmin),
  AuthControllers.updateUserStatus
);
router.delete(
  "/users/:id",
  auth(AUTH_ROLE.admin, AUTH_ROLE.superAdmin),
  AuthControllers.deleteUser
);

router.post(
  "/login",
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.loginUser
);
router.post(
  "/refresh-token",
  validateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken
);

router.post("/forget-password", AuthControllers.forgetPassword);
router.post("/reset-password", AuthControllers.resetPassword);

export const AuthRouters = router;
