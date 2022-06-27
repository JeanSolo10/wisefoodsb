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
};

export default Store;
