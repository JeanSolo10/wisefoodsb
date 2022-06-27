import { Router } from "express";
import UsersController from "../controllers/User.controller";
import { isAuthenticated } from "../middleware/middleware";

const router = Router();

router.get("/", isAuthenticated, UsersController.users_get_all);
router.get("/:email", isAuthenticated, UsersController.users_get_by_email);
router.put("/:id", isAuthenticated, UsersController.users_update);
router.delete("/:id", isAuthenticated, UsersController.users_delete);
router.get("/public/:email", UsersController.users_get_public_user_by_email);
router.post("/register", UsersController.user_register);
router.post("/login", UsersController.user_login);
router.delete("/logout/:id", UsersController.users_delete_tokens);
router.post("/refreshToken", UsersController.user_refresh_token);
router.post("/revokeRefreshTokens");

export default router;
