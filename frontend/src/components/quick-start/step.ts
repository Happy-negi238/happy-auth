import { User, AppWindow, ShieldCheck, KeyRound } from "lucide-react";

const steps = [
  {
    icon: User,
    title: "Create Developer Account",
    description: "Create your developer account to access the dashboard.",
  },
  {
    icon: AppWindow,
    title: "Register Your Application",
    description:
      "Create an application and receive your Client ID and Client Secret.",
    code: `Client ID
xxxxxxxxxxxxxxxx

Client Secret
xxxxxxxxxxxxxxxx`,
  },
  {
    icon: ShieldCheck,
    title: "Authorize the User",
    description:
      "Redirect the user to the authorization endpoint to obtain an authorization code.",
    code: `GET /authorize

client_id=...
redirect_uri=...
response_type=code
scope=openid profile email`,
  },
  {
    icon: KeyRound,
    title: "Exchange Code for Tokens",
    description: "Send the authorization code to the token endpoint.",
    code: `POST /token

grant_type=authorization_code
code=...
client_id=...
client_secret=...`,
  },
];

export default steps;
