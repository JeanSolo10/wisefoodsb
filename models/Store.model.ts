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
    });
    return store;
  },
  createStore: async (store: StoreInterface) => {
    return prisma.store.create({
      data: store,
    });
  },
  getPublicUserByEmail: async (email: any) => {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        email: true,
        role: true,
      },
    });
    if (!user) {
      return [];
    }
    return user;
  },
  findUserByEmail: async (email: string) => {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  },
};

export default Store;
