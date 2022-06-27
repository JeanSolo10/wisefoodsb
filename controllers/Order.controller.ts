import { Request, Response, NextFunction } from "express";
import Order from "../models/Order.model";

const OrderController = {
  orders_get_all: async (req: Request, res: Response) => {
    const userId = req.query.userId?.toString();
    if (userId) {
      const order = await Order.getOrderByUserId(userId);
      return res.json({ results: order });
    }
    const allOrders = await Order.getAll();
    return res.json({ results: allOrders });
  },
  orders_add: async (req: Request, res: Response, next: NextFunction) => {
    const { amount, address, status, userId } = req.body;
    try {
      if (!userId) {
        res.status(400);
        throw new Error("You must have user id to add order ");
      }

      const order = await Order.createOrder({
        amount,
        address,
        status,
        userId,
      });
      res.status(201).json({ results: { order } });
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
  },
};

export default OrderController;
