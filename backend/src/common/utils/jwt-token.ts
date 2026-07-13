import jwt, {type JwtPayload} from "jsonwebtoken";
import dotenv from "dotenv";
import { PRIVATE_KEY, PUBLIC_KEY } from "./cert";
dotenv.config();

type TokenType = "access" | "refresh";

export interface TokenPayload extends JwtPayload  {
  userId: string;
  name: string;
  email: string;
  tokenType?: TokenType;
};

export const generateAccessToken = (
  userId: string,
  name: string,
  email: string,
) => {
  try {
    const payload: TokenPayload = {
      userId,
      name,
      email,
      tokenType: "access",
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
) => {
  try {
    const payload: TokenPayload = {
      userId,
      name,
      email,
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

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
  } catch (error) {
    throw new Error("Invalid or expired access token");
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};
