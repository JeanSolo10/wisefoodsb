import aws from "aws-sdk";
import crypto, { randomBytes } from "crypto";
import "dotenv/config";

const region = "us-east-1";
const bucketName = "wisefoodsb-bucket";
const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

export const generateUploadURL = async () => {
  const rawBytes = randomBytes(16);
  const imageName = rawBytes.toString("hex");

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
};

export const deleteImageFromBucket = async (name: string) => {
  const params = {
    Bucket: bucketName,
    Key: name,
  };

  s3.deleteObject(params, function (err, data) {
    if (err) console.log(err, err.stack); // error
    else return; // deleted
  });
};
