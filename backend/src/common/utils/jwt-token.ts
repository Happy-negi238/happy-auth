import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PRIVATE_KEY } from "./cert";
dotenv.config();

type TokenType = "access" | "refresh";

type TokenPayload = {
  userId: string;
  name: string;
  email: string;
  tokenType?: TokenType;
  phone: string;
};

export const generateAccessToken = (
  userId: string,
  name: string,
  email: string,
  phone: string,
) => {
  try {
    const payload: TokenPayload = {
      userId,
      name,
      email,
      tokenType: "access",
      phone,
    };

    return jwt.sign(payload, PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: "10m",
    });
  } catch (error) {
    throw new Error("Error to getting token");
  }
};

export const generateRefreshToken = (
  userId: string,
  name: string,
  email: string,
  phone: string,
) => {
  try {
    const payload: TokenPayload = {
      userId,
      name,
      email,
      phone,
      tokenType: "refresh",
    };

    return jwt.sign(payload, PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: "7d",
    });
  } catch (error) {
    throw new Error("Error to generate token");
  }
};
