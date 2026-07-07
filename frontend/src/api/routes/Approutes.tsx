import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "../../components/home/Home";
import CreateApp from "../../components/create/Create-app";
import Layout from "../../Layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="create-app" element={<CreateApp />} />
    </Route>,
  ),
);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
