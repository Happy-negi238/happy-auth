import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { db } from "../../index";
import { developers } from "../../common/db/schema";
import ApiError from "../../common/utils/api-error";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../../common/utils/jwt-token";
import type { Request } from "express";

const SALT_ROUNDS = 10;

type ClientSignUpServiceType = {
  fullName: string;
  email: string;
  password: string;
};
type ClientSignInServiceType = {
  email: string;
  password: string;
};

type TokenPayload = {
  userId: string;
  name: string;
  email: string;
  tokenType: "access" | "refresh";
};

async function generateHashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

async function compareHashPassword(
  password: string,
  hashPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hashPassword);
}

export const clientSignUpService = async ({
  fullName,
  email,
  password,
}: ClientSignUpServiceType) => {
  // Check if developer already exists
  const existingDeveloper = await db
    .select()
    .from(developers)
    .where(eq(developers.email, email));

  if (existingDeveloper.length > 0) {
    return ApiError.conflict("User with this email already exist");
  }

  // Hash password
  const hashedPassword = await generateHashPassword(password);

  // Insert developer
  const [developer] = await db
    .insert(developers)
    .values({
      fullName,
      email,
      password: hashedPassword,
    })
    .returning();

  if (!developer) {
    return ApiError.InternalServerError("Failed to sending data");
  }

  const { id, email: userEmail } = developer;
  return { id, email: userEmail };
};

export const clientSignInService = async ({
  email,
  password,
}: ClientSignInServiceType) => {
  // Check developer already exists
  const existingDeveloper = await db
    .select()
    .from(developers)
    .where(eq(developers.email, email));

  if (existingDeveloper.length === 0 || !existingDeveloper[0]?.password) {
    return ApiError.unauthorized("User with this email does not exist");
  }

  // compare hash password
  const hashedPassword = await compareHashPassword(
    password,
    existingDeveloper[0].password,
  );

  if (!hashedPassword) {
    return ApiError.unauthorized("Email and password are incorrect");
  }

  const accessToken = generateAccessToken(
    existingDeveloper[0].id,
    existingDeveloper[0].fullName,
    existingDeveloper[0].email,
  );

  const refreshToken = generateRefreshToken(
    existingDeveloper[0].id,
    existingDeveloper[0].fullName,
    existingDeveloper[0].email,
  );

  const hashRefreshToken = await generateHashPassword(refreshToken);
  // set isActive developer
  const [developer] = await db
    .update(developers)
    .set({ isActive: true, refreshToken: hashRefreshToken })
    .where(eq(developers.email, email))
    .returning();

  if (!developer) {
    return ApiError.InternalServerError("Failed to sending data");
  }

  return { success: true, accessToken, refreshToken };
};

export const getMeService = async (userId: string) => {
  try {
    if (!userId) {
      return ApiError.badRequest("Bad request");
    }
    
    const [developer] = await db
      .select()
      .from(developers)
      .where(eq(developers.id, userId));

    if (!developer) {
      return ApiError.unauthorized("Developer not found");
    }

    const newAccessToken = generateAccessToken(
      developer.id,
      developer.fullName,
      developer.email,
    );

    const newRefreshToken = generateRefreshToken(
      developer.id,
      developer.fullName,
      developer.email,
    );

    return {
      success: true,
      newAccessToken,
      newRefreshToken,
    };
  } catch (error) {
    return ApiError.InternalServerError("Error to verify");
  }
};

export const logoutService = async (userId: string) => {
  if (!userId) {
    return ApiError.badRequest("Bad request");
  }

  const [developer] = await db
    .update(developers)
    .set({ refreshToken: null, isActive: false })
    .where(eq(developers.id, userId))
    .returning({ id: developers.id });

  if (!developer) {
    return ApiError.notFound("Developer not found");
  }

  return { success: true };
};
