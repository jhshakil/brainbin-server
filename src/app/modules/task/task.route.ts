import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { TaskValidations } from "./task.validation";
import { TaskControllers } from "./task.controller";
import auth from "../../middlewares/auth";
import { AUTH_ROLE } from "../auth/auth.constant";

const router: Router = Router();

router.post(
  "/",
  auth(AUTH_ROLE.user, AUTH_ROLE.admin, AUTH_ROLE.superAdmin),
  validateRequest(TaskValidations.createTaskValidation),
  TaskControllers.createTask
);

router.get(
  "/",
  auth(AUTH_ROLE.user, AUTH_ROLE.admin, AUTH_ROLE.superAdmin),
  TaskControllers.getAllTasks
);

router.get(
  "/:id",
  auth(AUTH_ROLE.user, AUTH_ROLE.admin, AUTH_ROLE.superAdmin),
  TaskControllers.getSingleTask
);
router.patch(
  "/:id",
  auth(AUTH_ROLE.user, AUTH_ROLE.admin, AUTH_ROLE.superAdmin),
  validateRequest(TaskValidations.updateTaskValidation),
  TaskControllers.updateTask
);
router.delete(
  "/:id",
  auth(AUTH_ROLE.user, AUTH_ROLE.admin, AUTH_ROLE.superAdmin),
  TaskControllers.deleteTask
);

export const TaskRouters = router;
