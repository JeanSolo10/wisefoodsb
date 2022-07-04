import { Request, Response, NextFunction } from "express";
import Product from "../models/Product.model";

export enum TransactionStatus {
  INCOMPLETE = "INCOMPLETE",
  PENDING = "PENDING",
  COMPLETE = "COMPLETE",
}

const ProductController = {
  products_get_all: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allProducts = await Product.getAll();
      return res.json({ results: allProducts });
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
  },
  products_get_by_id: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const product = await Product.getProductById(Number(id));
      return res.json({ results: product });
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
  },
  products_get_by_store_id: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { storeId } = req.params;
      const products = await Product.getProductByStoreId(Number(storeId));
      return res.json({ results: products });
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
  },
  products_get_by_store_id_and_availability: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { storeId, availability } = req.params;
      const availabilityBoolean = availability == "true";
      const products = await Product.getProductByStoreIdAndAvailability(
        Number(storeId),
        availabilityBoolean
      );
      return res.json({ results: products });
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
  },
  products_get_by_buyerId: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { buyerId } = req.params;
      const products = await Product.getProductsByBuyerId(buyerId);
      return res.json({ results: products });
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
  },
  products_get_by_availability: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { availability } = req.params;
      const availabilityBoolean = availability == "true";
      const products = await Product.getProductsByAvailability(
        availabilityBoolean
      );
      return res.json({ results: products });
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
  },
  products_get_by_transaction_status: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { transactionStatus } = req.params;
      const trasactionStatusEnum = transactionStatus as TransactionStatus;
      const product = await Product.getProductByTransactionStatus(
        trasactionStatusEnum
      );
      return res.json({ results: product });
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
  },
  products_get_by_store_id_and_transaction_status: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { storeId, transactionStatus } = req.params;
      const trasactionStatusEnum = transactionStatus as TransactionStatus;
      const products = await Product.getProductByStoreAndTransactionStatus(
        Number(storeId),
        trasactionStatusEnum
      );
      return res.json({ results: products });
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
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
  products_update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedProduct = await Product.updateProduct(Number(id), data);
      res.status(201).json({ results: updatedProduct });
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
  },
  products_delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deletedProduct = await Product.deleteProduct(Number(id));
      res.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
  },
};

export default ProductController;
