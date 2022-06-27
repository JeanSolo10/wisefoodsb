import prisma from "../utils/prisma";

export interface CartInterface {
  userId?: string;
  id?: number;
}

const Cart = {
  getAll: async () => {
    const allCarts = await prisma.cart.findMany();
    return allCarts;
  },
  getCartByUserId: async (userId: string) => {
    const cart = await prisma.cart.findFirst({
      where: {
        userId,
      },
    });
    return cart;
  },
  createCart: async (cart: CartInterface) => {
    return prisma.cart.create({
      data: cart,
    });
  },
};

export default Cart;
