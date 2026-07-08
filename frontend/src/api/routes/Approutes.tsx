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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="create-app" element={<CreateApp />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="sign-in" element={<SignIn />} />
    </Route>,
  ),
);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
