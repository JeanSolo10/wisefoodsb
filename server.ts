import express, { Request, Response } from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/api/users", (req: Request, res: Response) => {
  res.json({ resutls: "Initial Server API Endpoint" });
});

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
