import express, { type Response } from "express";
import { createServer } from "node:http";
import { router } from "./src/modules/auth/route.auth";
import cors from "cors";
function main() {
  const PORT = 8080;
  const app = express();
  const server = createServer(app);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    }),
  );
  app.use("/", router);

  app.get("/health", (req, res: Response) => {
    res.status(200).json({ ok: true });
  });

  server.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
  });
}

main();
