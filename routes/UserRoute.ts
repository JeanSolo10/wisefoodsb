import { Router } from "express";
import UsersController from "../controllers/User.controller";
import { isAuthenticated } from "../middleware/middleware";

const router = Router();

router.get("/", isAuthenticated, UsersController.users_get_all);
router.post("/register", UsersController.user_register);
router.post("/login", UsersController.user_login);
router.post("/refreshToken", UsersController.user_refresh_token);
router.post("/revokeRefreshTokens");

export default router;
