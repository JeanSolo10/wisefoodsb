import { Router } from "express";
import OrderController from "../controllers/Order.controller";
import { isAuthenticated } from "../middleware/middleware";

const router = Router();

router.get("/", isAuthenticated, OrderController.orders_get_all);
router.get("/find/:userId", isAuthenticated, OrderController.orders_get_all);
router.post("/add", isAuthenticated, OrderController.orders_add);
router.put("/:id", isAuthenticated, OrderController.orders_update);
router.delete("/:id", isAuthenticated, OrderController.orders_delete);

export default router;
