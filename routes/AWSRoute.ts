import { Router } from "express";
import { isAuthenticated } from "../middleware/middleware";
import AWSController from "../controllers/Aws.controller";

const router = Router();

router.post("/s3Url", isAuthenticated, AWSController.aws_upload_image);
router.delete("/:name", isAuthenticated, AWSController.aws_delete_image);

export default router;
