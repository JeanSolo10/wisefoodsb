import { Router } from "express";
import { isAuthenticated } from "../middleware/middleware";
import StripeController from "../controllers/Stripe.controller";
import "dotenv/config";

const router = Router();

router.post("/payment", isAuthenticated, StripeController.stripe_charge_user);

export default router;
