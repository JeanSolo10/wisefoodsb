import prisma from "../utils/prisma";

export interface OrderInterface {
  amount: number;
  address: object;
  status: string;
  userId?: string;
}

const Order = {
  getAll: async () => {
    const allOrders = await prisma.order.findMany();
    return allOrders;
  },
  getOrderByUserId: async (userId: string) => {
    const order = await prisma.order.findFirst({
      where: {
        userId,
      },
    });
    return order;
  },
  createOrder: async (order: OrderInterface) => {
    return prisma.order.create({
      data: order,
    });
  },
  updateOrder: async (id: number, data: any) => {
    return prisma.cart.update({
      where: {
        id,
      },
      data: data,
    });
  },
  deleteOrder: async (id: number) => {
    return prisma.cart.delete({
      where: {
        id,
      },
    });
  },
};

export default Order;
