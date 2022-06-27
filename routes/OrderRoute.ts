import { Router } from "express";
import OrderController from "../controllers/Order.controller";
import { isAuthenticated } from "../middleware/middleware";

const router = Router();

router.get("/", isAuthenticated, OrderController.orders_get_all);
router.post("/add", isAuthenticated, OrderController.orders_add);

export default router;
