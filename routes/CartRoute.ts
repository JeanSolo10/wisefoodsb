import { Router } from "express";
import CartController from "../controllers/Cart.controller";
import { isAuthenticated } from "../middleware/middleware";

const router = Router();

router.get("/", isAuthenticated, CartController.carts_get_all);
router.get(
  "/find/:userId",
  isAuthenticated,
  CartController.cart_get_by_user_id
);
router.post("/add", isAuthenticated, CartController.carts_add);
router.put("/:id", isAuthenticated, CartController.carts_update);
router.delete("/:id", isAuthenticated, CartController.carts_delete);

export default router;
