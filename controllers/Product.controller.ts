import { Request, Response, NextFunction } from "express";
import Product from "../models/Product.model";

const StoreController = {
  products_get_all: async (req: Request, res: Response) => {
    const id = Number(req.query.id);
    if (id) {
      const product = await Product.getProductById(id);
      return res.json({ results: product });
    }
    const allProducts = await Product.getAll();
    return res.json({ results: allProducts });
  },
  products_add: async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      type,
      price,
      original_price,
      expiration_date,
      imageUrl,
      storeId,
    } = req.body;
    try {
      if (
        !name ||
        !type ||
        !price ||
        !original_price ||
        !expiration_date ||
        !imageUrl
      ) {
        res.status(400);
        throw new Error(
          "You must provide a name, type, price, original price, expiration date and image url to add product "
        );
      }

      const product = await Product.createProduct({
        name,
        type,
        price,
        original_price,
        expiration_date,
        imageUrl,
        storeId,
      });
      res.status(201).json({ results: { product } });
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
  },
};

export default StoreController;
