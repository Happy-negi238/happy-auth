import { eq, and } from "drizzle-orm";
import jose from "node-jose"
import {
  authorizationCodes,
  registeredApps,
  users,
} from "../../common/db/schema";
import { db } from "../../index";
import type { RegisterBody, SignInBody, SignUpBody } from "./controller.auth";
import ApiError from "../../common/utils/api-error";
import crypto from "crypto";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../common/utils/jwt-token";
import { PUBLIC_KEY } from "../../common/utils/cert";

type AuthorizationType = {
  clientId: string;
  userId: string;
  redirectUri: string;
};

type TokenResponse = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
};

const SALTROUND = 10;
const AUTHORIZATON_CODE_TTL_MS = 60000; // 1m

async function generateHashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALTROUND);
}

async function compareHashPassword(
  password: string,
  hashPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hashPassword);
}

async function verifyClientId(clientId: string) {
  if (!clientId) {
    ApiError.badRequest("Invalid provider");
  }

  const [app] = await db
    .select()
    .from(registeredApps)
    .where(eq(registeredApps.clientId, clientId));
  if (!app) {
    throw ApiError.unauthorized("Unauthorized provider");
  }

  if (!app.clientId || !app.redirectUri) {
    throw ApiError.badRequest("Provider configuration is incomplete");
  }

  return {
    clientId: app.clientId,
    redirectUri: app.redirectUri,
  };
}

function buildRedirectUri(redirectUri: string, code: string) {
  const url = new URL(redirectUri);
  url.searchParams.append("code", code);
  return url.toString();
}

async function createAuthorizationCode(data: AuthorizationType) {
  const { clientId, userId, redirectUri } = data;

  const code = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + AUTHORIZATON_CODE_TTL_MS);

  const [insertedData] = await db
    .insert(authorizationCodes)
    .values({
      code,
      clientId,
      userId,
      expiresAt,
    })
    .returning();

  if (!insertedData) {
    throw ApiError.InternalServerError("Failed to create authorization code");
  }

  return {
    code,
    expiresAt: insertedData.expiresAt,
    redirectUri: buildRedirectUri(redirectUri, insertedData.code),
  };
}

export const registerService = async (data: RegisterBody) => {
  // check first appUrl and appName in db
  // if exist throw error
  // if not create a random hash (clientId, clientSecret)
  const { appName, appUrl, redirectUri } = data;

  const isExist = await db
    .select()
    .from(registeredApps)
    .where(
      and(
        eq(registeredApps.appName, appName),
        eq(registeredApps.appUrl, appUrl),
      ),
    );

  if (isExist.length > 0) {
    throw ApiError.conflict("App already registered");
  }

  const clientId = crypto.randomUUID();
  const clientSecret = crypto.randomBytes(32).toString("hex");

  const insertedData = await db
    .insert(registeredApps)
    .values({
      appName,
      appUrl,
      redirectUri,
      clientId,
      clientSecret,
    })
    .returning();

  if (insertedData.length === 0) {
    throw ApiError.InternalServerError("Failed to insert data");
  }

  return {
    clientId,
    clientSecret,
  };
};

export const signUpService = async (data: SignUpBody, clientId: string) => {
  await verifyClientId(clientId);

  const { email, name, password, phone } = data;

  const [isExist] = await db.select().from(users).where(eq(users.email, email));

  if (isExist) {
    throw ApiError.badRequest("Email already exist");
  }

  const hashPassword = await generateHashPassword(password);

  const isDataInserted = await db
    .insert(users)
    .values({
      name,
      email,
      phone,
      password: hashPassword,
    })
    .returning();

  if (isDataInserted.length === 0) {
    throw ApiError.InternalServerError("Failed to insert data");
  }

  return {
    name,
    email,
    phone,
  };
};

export const singInService = async (data: SignInBody, clientId: string) => {
  const clientData = await verifyClientId(clientId);

  const { email, password } = data;

  const [signUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (!signUser) {
    throw ApiError.badRequest("Email-id is not exist");
  }

  const comparePassword = await compareHashPassword(password, signUser.password);

  if (!comparePassword) {
    throw ApiError.badRequest("Email-id and password are incorrect");
  }

  const authorizationCode = await createAuthorizationCode({
    clientId: clientData.clientId,
    userId: signUser.id,
    redirectUri: clientData.redirectUri,
  });

  const { code, expiresAt, redirectUri } = authorizationCode;

  return {
    email,
    name: signUser.name,
    userId: signUser.id,
    expiresAt,
    redirectUri,
    code,
  };
};

export const tokenService = async (body: TokenResponse, code: string) => {
  // 2. Find authorization code in DB
  // 3. Verify code is not expired
  // 4. Verify code has not been used
  // 5. Find registered app using client_id
  // 6. Verify client_secret
  // 7. Verify redirect_uri matches
  // 8. Verify authorizationCode.clientId === body.client_id
  // 9. Get user
  // 10. Generate Access Token
  // 11. Generate ID Token
  // 12. Generate Refresh Token (optional)
  // 13. Mark authorization code as used/delete it
  // 14. Return tokens

  const [authorizationCode] = await db
    .select()
    .from(authorizationCodes)
    .where(eq(authorizationCodes.code, code));

  if (!authorizationCode) {
    throw ApiError.badRequest("Invalid authorization code");
  }

  if (authorizationCode.isUsed) {
    throw ApiError.badRequest("Authorization code has already been used");
  }

  if (authorizationCode.expiresAt < new Date()) {
    throw ApiError.badRequest("Authorization code has expired");
  }

  const [app] = await db
    .select()
    .from(registeredApps)
    .where(eq(registeredApps.clientId, authorizationCode.clientId));

  if (!app) {
    throw ApiError.badRequest("Invalid client_id");
  }

  if (app.clientSecret !== body.clientSecret) {
    throw ApiError.badRequest("Invalid client_secret");
  }

  if (app.redirectUri !== body.redirectUri) {
    throw ApiError.badRequest("Invalid redirect_uri");
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, authorizationCode.userId));
  if (!user) {
    throw ApiError.badRequest("User not found");
  }

  const accessToken = generateAccessToken(
    user.id,
    user.name,
    user.email,
    user.phone ?? "",
  );
  const refreshToken = generateRefreshToken(
    user.id,
    user.name,
    user.email,
    user.phone ?? "",
  );

  const hashRefreshToken = await generateHashPassword(refreshToken);

  await db
    .update(users)
    .set({ refreshToken: hashRefreshToken })
    .where(eq(users.id, user.id));
  await db
    .update(authorizationCodes)
    .set({ isUsed: true })
    .where(eq(authorizationCodes.code, code));

  return {
    accessToken,
    refreshToken,
    redirectUri: app.redirectUri,
  };
};

export const certService = async () => {
  const key = await jose.JWK.asKey(PUBLIC_KEY, "pem");
  return key.toJSON()
}
