import { Request, Response, NextFunction } from "express";
import { generateUploadURL } from "../utils/aws_config/s3";
import "dotenv/config";

const AWSController = {
  aws_upload_image: async (req: Request, res: Response, next: NextFunction) => {
    const url = await generateUploadURL();
    res.send({ url });
  },
};

export default AWSController;
