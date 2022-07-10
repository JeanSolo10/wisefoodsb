import { Request, Response, NextFunction } from "express";
import {
  generateUploadURL,
  deleteImageFromBucket,
} from "../utils/aws_config/s3";
import "dotenv/config";

const AWSController = {
  aws_upload_image: async (req: Request, res: Response, next: NextFunction) => {
    const url = await generateUploadURL();
    res.send({ url });
  },
  aws_delete_image: async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.params;
    await deleteImageFromBucket(name);
    res.sendStatus(204);
  },
};

export default AWSController;
