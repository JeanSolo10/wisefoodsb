import { Request, Response, NextFunction } from "express";
import Store from "../models/Store.model";

const StoreController = {
  stores_get_all: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allStores = await Store.getAll();
      return res.json({ results: allStores });
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
  },
  stores_get_by_id: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const store = await Store.getStoreById(Number(id));
      return res.json({ results: store });
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
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
  stores_update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedUser = await Store.updateStore(Number(id), data);
      res.status(201).json({ results: updatedUser });
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
  },
  stores_delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deletedProduct = await Store.deleteStore(Number(id));
      res.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
  },
};

export default StoreController;
