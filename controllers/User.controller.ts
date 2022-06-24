import { Request, Response, NextFunction } from "express";
import User from "../models/User.model";
import { v4 } from "uuid";
import { generateTokens } from "../utils/jwt";
import Auth from "../models/Auth.model";
import bcrypt from "bcrypt";
import { hashToken } from "../utils/hashToken";
import jwt from "jsonwebtoken";

const UserController = {
  users_get_all: async (req: Request, res: Response) => {
    const allUsers = await User.getAll();
    res.json({ results: allUsers });
  },
  users_get_all_public: async (req: Request, res: Response) => {
    const email = req.query.email;
    const allUsers = await User.getPublicUserByEmail(email);
    res.json({ results: allUsers });
  },
  user_register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, role } = req.body;
      if (!email || !password) {
        res.status(400);
        throw new Error("You must provide an email and a password");
      }

      const existingUser = await User.findUserByEmail(email);

      if (existingUser) {
        res.status(400);
        throw new Error("Email already in use");
      }

      if (role !== "SELLER" && role !== "BUYER") {
        res.status(400);
        throw new Error("Role needs to be either: SELLER or BUYER");
      }

      const user = await User.createUserByEmailAndPassword({
        email,
        password,
        role,
      });
      const jti = v4();
      const { accessToken, refreshToken } = generateTokens(user, jti);
      await Auth.addRefreshTokenToWhitelist({
        jti,
        refreshToken,
        userId: user.id,
      });

      res.json({ results: { accessToken, refreshToken } });
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
  },
  user_login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400);
        throw new Error("You must provide an email and a password");
      }

      const existingUser = await User.findUserByEmail(email);

      if (!existingUser) {
        res.status(403);
        throw new Error("Invalid login credentials.");
      }

      const validPassword = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!validPassword) {
        res.status(403);
        throw new Error("Invalid login credentials.");
      }

      const jti = v4();
      const { accessToken, refreshToken } = generateTokens(existingUser, jti);
      await Auth.addRefreshTokenToWhitelist({
        jti,
        refreshToken,
        userId: existingUser.id,
      });

      res.json({
        results: { accessToken, refreshToken },
      });
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
  },
  user_refresh_token: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        res.status(400);
        throw new Error("Missing refresh token.");
      }
      const payload = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string
      );
      //@ts-ignore
      const savedRefreshToken = await Auth.findRefreshTokenById(payload.jti);

      if (!savedRefreshToken || savedRefreshToken.revoked === true) {
        res.status(401);
        throw new Error("Unauthorized");
      }

      const hashedToken = hashToken(refreshToken);
      if (hashedToken !== savedRefreshToken.hashedToken) {
        res.status(401);
        throw new Error("Unauthorized");
      }
      //@ts-ignore
      const user = await User.findUserById(payload.userId);
      if (!user) {
        res.status(401);
        throw new Error("Unauthorized");
      }

      await Auth.deleteRefreshToken(savedRefreshToken.id);
      const jti = v4();
      const { accessToken, refreshToken: newRefreshToken } = generateTokens(
        user,
        jti
      );
      await Auth.addRefreshTokenToWhitelist({
        jti,
        refreshToken: newRefreshToken,
        userId: user.id,
      });

      res.json({
        accessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
  },
  // This endpoint should not be visible in the api
  // Move this logic where you need to revoke the tokens( for ex, on password reset)
  revokeRefreshTokens: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.body;
      await Auth.revokeTokens(userId);
      res.json({ message: `Tokens revoked for user with id #${userId}` });
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
  },
};

export default UserController;
