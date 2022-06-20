import prisma from "../utils/prisma";
import { Role } from "@prisma/client";

export interface UserInterface {
  password: string;
  email: string;
  role: Role;
}

const User = {
  getAll: async () => {
    const allUsers = await prisma.user.findMany({
      select: {
        email: true,
        role: true,
      },
    });
    return allUsers;
  },
  findUserByEmail: async (email: string) => {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  },
};

export default User;
