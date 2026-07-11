import api from "./axios";

export type RegisterAppPayload = {
  appName: string;
  appUrl: string;
  redirectUri: string;
};

export type DeveloperSignUp = {
  fullName: string;
  email: string;
  password: string;
};

export type DeveloperSignIn = {
  email: string;
  password: string;
};

export const registerApp = async (payload: RegisterAppPayload) => {
  const { data } = await api.post("/register-app", payload);
  return data;
};

export const developerSignUp = async (payload: DeveloperSignUp) => {
  const response = await api.post("/user/sign-up", payload);
  const { data } = response;
  return data;
};

export const developerSignIn = async (payload: DeveloperSignIn) => {
  const response = await api.post("/user/sign-in", payload);
  const { data } = response;
  return data;
};

export const authenticate = async () => {
  const { data } = await api.get("/user/me");
  return data;
};

export const unAuthenticate = async () => {
  const response = await api.get("/user/logout");
  const { data, status } = response;
  return { data, status };
};
