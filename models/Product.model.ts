import prisma from "../utils/prisma";

export interface ProductInterface {
  name: string;
  type: string;
  price: number;
  original_price: number;
  expiration_date: Date;
  imageUrl: string;
  storeId?: number;
  cartId?: number;
  orderId?: number;
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
  createProduct: async (product: ProductInterface) => {
    return prisma.product.create({
      data: product,
    });
  },
};

export default Product;