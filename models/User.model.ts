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
        first_name: true,
        last_name: true,
        role: true,
        Store: true,
      },
    });
    return allUsers;
  },
  getUserByEmail: async (email: any) => {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        role: true,
        Store: true,
      },
    });
    return user;
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
  updateUser: async (id: string, data: any) => {
    return prisma.user.update({
      where: {
        id,
      },
      data: data,
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        role: true,
      },
    });
  },
  deleteUser: async (id: string) => {
    return prisma.user.delete({
      where: {
        id,
      },
    });
  },
  deleteTokens: async (id: string) => {
    const tokenIds = await prisma.refreshToken.findMany({
      where: {
        userId: id,
      },
    });
    for (const item of tokenIds) {
      await prisma.refreshToken.delete({
        where: {
          id: item.id,
        },
      });
    }

    return;
  },
};

export default User;
