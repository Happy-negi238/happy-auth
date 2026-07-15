import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "../../components/home/Home";
import CreateApp from "../../components/create-app/CreateApp";
import Layout from "../../Layout";
import SignUp from "@/components/auth/sign-up/SignUp";
import SignIn from "@/components/auth/sign-in/SignIn";
import ProtectedRoute from "@/ProtectedRoute";
import OauthSignUpPage from "@/oauth/oauth-signup/OauthSignup";
import OauthSignInPage from "@/oauth/oauth-singin/OauthSignin";
import AuthLayout from "@/oauth/AuthLayout";
import NotFound from "@/NotFound";
import PublicRoute from "@/PublicRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index path="" element={<Home />} />

      <Route element={<ProtectedRoute />}>
        <Route path="create-app" element={<CreateApp />} />
      </Route>

      <Route element={<PublicRoute />}>
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>

      <Route path="o/auth" element={<AuthLayout />}>
        <Route index element={<OauthSignUpPage />} />
        <Route path="sign-in" element={<OauthSignInPage />} />
      </Route>

      <Route path="/not-found" element={<NotFound />} />
    </Route>,
  ),
);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
