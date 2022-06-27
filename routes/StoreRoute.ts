import { Router } from "express";
import StoreController from "../controllers/Store.controller";
import { isAuthenticated } from "../middleware/middleware";

const router = Router();

router.get("/", isAuthenticated, StoreController.stores_get_all);
router.get("/:id", isAuthenticated, StoreController.stores_get_by_id);
router.post("/", isAuthenticated, StoreController.stores_add);
router.put("/:id", isAuthenticated, StoreController.stores_update);
router.delete("/:id", isAuthenticated, StoreController.stores_delete);



export default router;
