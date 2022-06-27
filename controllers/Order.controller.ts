import { Request, Response, NextFunction } from "express";
import Order from "../models/Order.model";

const OrderController = {
  orders_get_all: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allOrders = await Order.getAll();
      return res.json({ results: allOrders });
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
  },
  orders_get_by_user_id: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.params;
      const order = await Order.getOrderByUserId(userId);
      return res.json({ results: order });
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
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
  orders_update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedOrder = await Order.updateOrder(Number(id), data);
      res.status(201).json({ results: updatedOrder });
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
  },
  orders_delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deletedOrder = await Order.deleteOrder(Number(id));
      res.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
  },
};

export default OrderController;
