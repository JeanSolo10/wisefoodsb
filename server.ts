import express, { Request, Response } from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/UserRoute";

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;
app.use(cors());

/* routes */
app.use("/api/v1/users", userRouter);
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
