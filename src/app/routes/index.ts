import { Router } from "express";
import { AuthRouters } from "../modules/auth/auth.route";
import { TaskRouters } from "../modules/task/task.route";

const router: Router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRouters,
  },
  {
    path: "/task",
    route: TaskRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
