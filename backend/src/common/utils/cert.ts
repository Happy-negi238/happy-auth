import { readFileSync } from "node:fs";
import path from "node:path";

export const PRIVATE_KEY = readFileSync(path.resolve("cert/private.pem"), "utf-8");
export const PUBLIC_KEY = readFileSync(path.resolve("cert/public.pem"), "utf-8");
