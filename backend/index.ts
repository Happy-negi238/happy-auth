import express, { type Response } from "express";
import { createServer } from "node:http";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import { router } from "./src/modules/auth/route.auth";
import { userRoute } from "./src/modules/user-auth/route.user";
import { errorHandler } from "./src/common/utils/error-handler";

function main() {
  const PORT = 8080;
  const app = express();
  const server = createServer(app);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    cors({
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      credentials: true,
    }),
  );
  app.use("/", router);
  app.use("/user", userRoute)

  app.get("/health", (req, res: Response) => {
    res.status(200).json({ ok: true });
  });

  app.use(errorHandler);

  server.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
  });
}

main();
