import { Router } from "express";
import ProductController from "../controllers/Product.controller";
import { isAuthenticated } from "../middleware/middleware";

const router = Router();

router.get("/", isAuthenticated, ProductController.products_get_all);
router.get("/:id", isAuthenticated, ProductController.products_get_by_id);
router.post("/add", isAuthenticated, ProductController.products_add);
router.put("/:id", isAuthenticated, ProductController.products_update);
router.delete("/:id", isAuthenticated, ProductController.products_delete);

export default router;
