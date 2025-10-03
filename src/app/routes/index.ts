import { Router } from "express";
import { AuthRouters } from "../modules/auth/auth.route";

const router: Router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
