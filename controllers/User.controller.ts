import { Request, Response } from "express";
import User from "../models/User.model";


const UserController = {
  users_get_all: async (req: Request, res: Response) => {
    const allUsers = await User.getAll();
    res.json({ results: allUsers });
  },
};

export default UserController;
