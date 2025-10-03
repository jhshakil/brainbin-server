import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { TaskValidations } from "./task.validation";
import { TaskControllers } from "./task.controller";

const router: Router = Router();

router.post(
  "/create-task",
  validateRequest(TaskValidations.createTaskValidation),
  TaskControllers.createTask
);

router.get("/get-tasks", TaskControllers.getAllTasks);

router.get("/get-task/:id", TaskControllers.getSingleTask);
router.patch(
  "/update-task/:id",
  validateRequest(TaskValidations.updateTaskValidation),
  TaskControllers.updateTask
);
router.delete("/delete-task/:id", TaskControllers.deleteTask);

export const TaskRouters = router;
