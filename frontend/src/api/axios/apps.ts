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

export type OauthSignUp = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
};

export type OauthSignIn = {
  email: string;
  password: string;
};

export const registerApp = async (payload: RegisterAppPayload) => {
  const { data } = await api.post("/register-app", payload);
  return { data };
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
  const { data } = await api.get("/user/authenticate");
  return { data };
};

export const unAuthenticate = async () => {
  const response = await api.get("/user/logout");
  const { data, status } = response;
  return { data, status };
};

export const oauthSignUp = async (payload: OauthSignUp, clientId: string) => {
  const response = await api.post("/o/auth", payload, {
    params:{
      client_id: clientId,
    }
  });
  const { data } = response;
  return { data };
};

export const oauthSignUpClientId = async (clientId: string) => {
  const response = await api.get("/o/auth/verify", {
    params: {
      client_id: clientId,
    },
  });
  const { data } = response;
  return { data };
};

export const oauthSignIn = async (payload: OauthSignIn, clientId: string) => {
  const response = await api.post("/o/auth/sign-in", payload, {
    params: {
      client_id: clientId,
    }
  });
  const { data } = response;
  return { data };
};
