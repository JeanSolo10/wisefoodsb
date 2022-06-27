import { Router } from "express";
import ProductController from "../controllers/Product.controller";
import { isAuthenticated } from "../middleware/middleware";

const router = Router();

router.get("/", isAuthenticated, ProductController.products_get_all);
router.post("/add", isAuthenticated, ProductController.products_add);

export default router;
