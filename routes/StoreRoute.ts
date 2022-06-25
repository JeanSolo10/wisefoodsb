import { Router } from "express";
import StoreController from "../controllers/Store.controller";
import { isAuthenticated } from "../middleware/middleware";

const router = Router();

router.get("/", isAuthenticated, StoreController.stores_get_all);
router.post("/add", isAuthenticated, StoreController.stores_add);

export default router;
