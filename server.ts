import express, { Request, Response } from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/UserRoute";
import storeRouter from "./routes/StoreRoute";
import productRouter from "./routes/ProductRoute";
import stripeRouter from "./routes/StripeRoute";
import AWSRouter from "./routes/AWSRoute";

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;
app.use(cors());

/* routes */
app.use("/api/v1/users", userRouter);
app.use("/api/v1/stores", storeRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/stripe", stripeRouter);
app.use("/api/v1/aws", AWSRouter);
/* routes */

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "web/build")));
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(
      path.resolve(path.join(__dirname, "web/build/", "index.html"))
    );
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
