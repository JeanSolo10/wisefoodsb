import { Router } from "express";
import UserController from "../controllers/User.controller";
import { isAuthenticated } from "../middleware/middleware";

const router = Router();

router.get("/", isAuthenticated, UserController.users_get_all);
router.post("/register", UserController.user_register);
router.post("/login", UserController.user_login);
router.post("/refreshToken", UserController.user_refresh_token);
router.post("/revokeRefreshTokens");

export default router;
