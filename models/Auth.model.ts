import { hashToken } from "../utils/hashToken";
import prisma from "../utils/prisma";

const Auth = {
  //used when we create a refresh token.
  // @ts-ignore:
  addRefreshTokenToWhitelist: async ({ jti, refreshToken, userId }) => {
    return prisma.refreshToken.create({
      // @ts-ignore:
      data: {
        id: jti,
        hashedToken: hashToken(refreshToken),
        userId,
      },
    });
  },
  //used to check if the token sent by the client is in the database
  findRefreshTokenById: async (id: string) => {
    return prisma.refreshToken.findUnique({
      where: {
        id,
      },
    });
  },
  //soft delete tokens after usage
  deleteRefreshToken: async (id: string) => {
    return prisma.refreshToken.update({
      where: {
        id,
      },
      data: {
        revoked: true,
      },
    });
  },
  revokeTokens: async (userId: string) => {
    return prisma.refreshToken.updateMany({
      where: {
        userId,
      },
      data: {
        revoked: true,
      },
    });
  },
};

export default Auth;
