import { Router } from "express";
import CartController from "../controllers/Cart.controller";
import { isAuthenticated } from "../middleware/middleware";

const router = Router();

router.get("/", isAuthenticated, CartController.carts_get_all);
router.post("/add", isAuthenticated, CartController.carts_add);

export default router;
