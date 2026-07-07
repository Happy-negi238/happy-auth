import api from "./axios";

export type RegisterAppPayload = {
  appName: string;
  appUrl: string;
  redirectUri: string;
}

export const registerApp = async (payload: RegisterAppPayload) => {
  const { data } = await api.post("/register-app", payload);
  return data;
};
