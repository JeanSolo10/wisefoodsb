import { Router } from "express";
import UserController from "../controllers/User.controller";

const router = Router();

router.get("/", UserController.users_get_all);

export default router;
