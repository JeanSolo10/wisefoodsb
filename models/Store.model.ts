import prisma from "../utils/prisma";

export interface StoreInterface {
  userId: string;
  address: string;
  name: string;
  phone_number: string;
  opening_hours: string;
  closing_hours: string;
}

const Store = {
  getAll: async () => {
    const allStores = await prisma.store.findMany();
    return allStores;
  },
  getStoreById: async (id: number) => {
    const store = await prisma.store.findFirst({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });
    return store;
  },
  createStore: async (store: StoreInterface) => {
    return prisma.store.create({
      data: store,
    });
  },
  updateStore: async (id: number, data: any) => {
    return prisma.store.update({
      where: {
        id,
      },
      data: data,
    });
  },
  deleteStore: async (id: number) => {
    return prisma.store.delete({
      where: {
        id,
      },
    });
  },
};

export default Store;
