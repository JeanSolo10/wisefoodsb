import { Router } from "express";
import ProductController from "../controllers/Product.controller";
import { isAuthenticated } from "../middleware/middleware";

const router = Router();

router.get("/", isAuthenticated, ProductController.products_get_all);
router.get("/:id", isAuthenticated, ProductController.products_get_by_id);
router.get(
  "/store/:storeId",
  isAuthenticated,
  ProductController.products_get_by_store_id
);
router.get(
  "/buyer/:buyerId",
  isAuthenticated,
  ProductController.products_get_by_buyerId
);
router.get(
  "/available/:availability",
  isAuthenticated,
  ProductController.products_get_by_availability
);
router.get(
  "/transaction/:transactionStatus",
  isAuthenticated,
  ProductController.products_get_by_transaction_status
);
router.post("/", isAuthenticated, ProductController.products_add);
router.put("/:id", isAuthenticated, ProductController.products_update);
router.delete("/:id", isAuthenticated, ProductController.products_delete);

export default router;
