import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";
import "dotenv/config";

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  apiVersion: "2020-08-27",
});

const StripeController = {
  stripe_charge_user: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const stripeResponse = await stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "JPY",
      });

      res.status(200).json({ results: stripeResponse });
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
  },
};

export default StripeController;
