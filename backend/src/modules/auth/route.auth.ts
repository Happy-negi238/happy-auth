import express, { type Request, type Response } from "express";
import RegisterDto from "./dto/register.dto";
import validate from "../../common/middleware/validate.middleware";
import * as controller from "./controller.auth";
import dotenv from "dotenv";
import SignUpDto from "./dto/sign-up.dto";
import SignInDto from "./dto/sign-in.dto";
dotenv.config();

export const router = express.Router();

const ISSUER = process.env.ISSUER ?? `http://localhost:8080`;

router.get("/.well-known/openid-configuration", (_, res: Response) => {
  return res.json({
    issuer: `${ISSUER}`,
    authorization_endpoint: `${ISSUER}/o/auth`,
    token_endpoint: `${ISSUER}/token`,
    userinfo_endpoint: `${ISSUER}/userinfo`,
    jwks_uri: `${ISSUER}/cert`,
  });
});

router.post(
  "/register-app",
  validate(RegisterDto),
  controller.registerController,
);

// OATH Route
router.get("/o/auth", controller.signUpAuthController);
router.post("/o/auth", validate(SignUpDto), controller.signUpController);
router.post("/o/auth/sign-in", validate(SignInDto), controller.signInController);
router.post("/token",  controller.tokenController);
router.get("/cert", controller.certController);
