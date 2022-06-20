import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401);
    throw new Error("Un-Authorized");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
    //@ts-ignore
    req.payload = payload;
  } catch (error) {
    res.status(401);
    if (error instanceof Error) {
      if (error.name === "TokenExpiredError") {
        throw new Error(error.name);
      }
      throw new Error("Un-Authorized");
    }
  }
  return next();
};
