import { Request, Response, NextFunction } from "express";
import Store from "../models/Store.model";

const StoreController = {
  stores_get_all: async (req: Request, res: Response) => {
    const allStores = await Store.getAll();
    return res.json({ results: allStores });
  },
  stores_add: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        name,
        userId,
        address,
        phone_number,
        opening_hours,
        closing_hours,
      } = req.body;

      if (!name || !address || !userId) {
        res.status(400);
        throw new Error(
          "You must provide a name, address, and user id reference for store "
        );
      }

      const store = await Store.createStore({
        name,
        userId,
        address,
        phone_number,
        opening_hours,
        closing_hours,
      });
      res.status(201).json({ results: { store } });
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
  },
};

export default StoreController;
