import { readFileSync } from "node:fs";
import path from "node:path";

//import dotenv from "dotenv"; then get PRIVATE_KEY and PUBLIC_KEY from .env file
import dotenv from "dotenv";
dotenv.config();

export const PRIVATE_KEY = process.env.PRIVATE_KEY?.replace(/\\n/g, "\n") || readFileSync(path.resolve("cert/private.pem"), "utf-8");
export const PUBLIC_KEY = process.env.PUBLIC_KEY?.replace(/\\n/g, "\n") || readFileSync(path.resolve("cert/public.pem"), "utf-8");
