import prisma from "../utils/prisma";
import bcrypt from "bcrypt";
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
        id: true,
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
  createUserByEmailAndPassword: async (user: UserInterface) => {
    user.password = bcrypt.hashSync(user.password, 12);
    return prisma.user.create({
      data: user,
    });
  },
  findUserById: async (id: string) => {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  },
};

export default User;
