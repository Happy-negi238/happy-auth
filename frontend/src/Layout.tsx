import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const Layout = () => {
  const { pathname } = useLocation();

  const hideHeader = pathname.startsWith("/o/auth");
  return (
    <>
      {!hideHeader && <Header />}
      <Outlet />
      {!hideHeader && <Footer />}
    </>
  );
};

export default Layout;
