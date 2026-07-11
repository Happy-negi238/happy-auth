import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/header/Header";

const Layout = () => {
  const { pathname } = useLocation();

  const hideHeader = pathname.startsWith("/o/auth");
  return (
    <>
      {!hideHeader && <Header />}
      <Outlet />
    </>
  );
};

export default Layout;
