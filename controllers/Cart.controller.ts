import { Request, Response, NextFunction } from "express";
import Cart from "../models/Cart.model";

const CartController = {
  carts_get_all: async (req: Request, res: Response) => {
    const userId = req.query.userId?.toString();
    if (userId) {
      const cart = await Cart.getCartByUserId(userId);
      return res.json({ results: cart });
    }
    const allCarts = await Cart.getAll();
    return res.json({ results: allCarts });
  },
  carts_add: async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;
    try {
      if (!userId) {
        res.status(400);
        throw new Error("You must have user id to add cart ");
      }

      const cart = await Cart.createCart({
        userId,
      });
      res.status(201).json({ results: { cart } });
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
  },
};

export default CartController;
