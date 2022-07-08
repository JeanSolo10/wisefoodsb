import prisma from "../utils/prisma";

export interface ProductInterface {
  name: string;
  type: string;
  price: number;
  original_price: number;
  expiration_date: Date;
  imageUrl: string;
  storeId?: number;
  buyerId?: string;
  is_available_in_market?: boolean;
  transaction_status?: TransactionStatus;
}

export enum TransactionStatus {
  INCOMPLETE = "INCOMPLETE",
  PENDING = "PENDING",
  COMPLETE = "COMPLETE",
}

const Product = {
  getAll: async () => {
    const allProducts = await prisma.product.findMany();
    return allProducts;
  },
  getProductById: async (id: number) => {
    const product = await prisma.product.findFirst({
      where: {
        id,
      },
    });
    return product;
  },
  getProductByStoreId: async (storeId: number) => {
    const product = await prisma.product.findMany({
      where: {
        storeId,
      },
      orderBy: [
        {
          id: "desc",
        },
      ],
    });
    return product;
  },
  getProductByStoreIdAndAvailability: async (
    storeId: number,
    availability: boolean
  ) => {
    const product = await prisma.product.findMany({
      where: {
        storeId,
        is_available_in_market: availability,
      },
      orderBy: [
        {
          id: "desc",
        },
      ],
    });
    return product;
  },
  getProductsByBuyerId: async (buyerId: string) => {
    const products = await prisma.product.findMany({
      where: {
        buyerId,
      },
      orderBy: [
        {
          id: "desc",
        },
      ],
      include: {
        Store: true,
      },
    });
    return products;
  },
  getProductsByAvailability: async (availability: boolean) => {
    const product = await prisma.product.findMany({
      where: {
        is_available_in_market: availability,
      },
      orderBy: [
        {
          id: "desc",
        },
      ],
    });
    return product;
  },
  getProductByTransactionStatus: async (
    transactionStatus: TransactionStatus
  ) => {
    const product = await prisma.product.findMany({
      where: {
        transaction_status: transactionStatus,
      },
      orderBy: [
        {
          id: "desc",
        },
      ],
    });
    return product;
  },
  getProductByStoreAndTransactionStatus: async (
    storeId: number,
    transactionStatus: TransactionStatus
  ) => {
    const products = await prisma.product.findMany({
      where: {
        storeId,
        transaction_status: transactionStatus,
      },
      orderBy: [
        {
          id: "desc",
        },
      ],
      select: {
        id: true,
        name: true,
        storeId: true,
        is_available_in_market: true,
        buyerId: true,
        price: true,
        original_price: true,
        transaction_status: true,
        imageUrl: true,
        User: {
          select: {
            first_name: true,
            last_name: true,
            phone_number: true,
          },
        },
      },
    });
    return products;
  },
  createProduct: async (product: ProductInterface) => {
    return prisma.product.create({
      data: product,
    });
  },
  updateProduct: async (id: number, data: any) => {
    return prisma.product.update({
      where: {
        id,
      },
      data: data,
    });
  },
  deleteProduct: async (id: number) => {
    return prisma.product.delete({
      where: {
        id,
      },
    });
  },
};

export default Product;
