import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "../../components/home/Home";
import CreateApp from "../../components/create/Create-app";
import Layout from "../../Layout";
import SignUp from "@/components/auth/sign-up/Sign-up";
import SignIn from "@/components/auth/sign-in/Sign-in";
import ProtectedRoute from "@/ProtectedRoute";
import OauthSignUpPage from "@/oauth/oauth-signup/Oauth-signup";
import OauthSignInPage from "@/oauth/oauth-singin/Oauth-signin";
import AuthLayout from "@/oauth/AuthLayout";
import NotFound from "@/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index path="" element={<Home />} />
      <Route element={<ProtectedRoute />}>
        <Route path="create-app" element={<CreateApp />} />
      </Route>
      <Route path="sign-up" element={<SignUp />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="o/auth" element={<AuthLayout />}>
        <Route index element={<OauthSignUpPage />} />
        <Route path="sign-in" element={<OauthSignInPage />} />
      </Route>
      <Route path="/not-found" element={<NotFound/>}/>
    </Route>,
  ),
);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
