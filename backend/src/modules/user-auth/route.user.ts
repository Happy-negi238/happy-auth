import express from "express"
import validate from "../../common/middleware/validate.middleware";
import clientSignInDto from "./dto/client-sign-in.dto";
import clientSignUpDto from "./dto/client-sign-up.dto";
import * as controller from "./controller.user"

export const userRoute = express.Router();

// User Route
userRoute.post("/sign-up", validate(clientSignUpDto), controller.clientSignUp);
userRoute.post("/sign-in", validate(clientSignInDto), controller.clientSignIn);
