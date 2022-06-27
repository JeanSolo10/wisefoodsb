import { Request, Response, NextFunction } from "express";
import Cart from "../models/Cart.model";

const CartController = {
  carts_get_all: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allCarts = await Cart.getAll();
      return res.json({ results: allCarts });
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
  },
  cart_get_by_user_id: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.params;
      const cart = await Cart.getCartByUserId(userId);
      return res.json({ results: cart });
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
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
  carts_update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedCart = await Cart.updateCart(Number(id), data);
      res.status(201).json({ results: updatedCart });
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
  },
  carts_delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deletedProduct = await Cart.deleteCart(Number(id));
      res.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
  },
};

export default CartController;
