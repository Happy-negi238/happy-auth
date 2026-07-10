import { useAuth } from "@/context/AuthContext";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/10 bg-[(--background)]/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-275 items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          OIDC
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm transition py-2 px-3 rounded ease-in-out ${
                isActive
                  ? "text-white bg-neutral-300/10 "
                  : "text-neutral-300 hover:text-white"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/create-app"
            className={({ isActive }) =>
              `text-sm transition  py-2 px-3 rounded ease-in-out
            ${
              isActive
                ? "text-white bg-neutral-300/10"
                : "text-neutral-300 hover:text-white"
            }`
            }
          >
            Create-app
          </NavLink>
          {isAuthenticated ? (
            <button>Logout</button>
          ) : (
            <>
              <NavLink
                to="/sign-in"
                className={({ isActive }) =>
                  `text-sm  transition py-2 px-3 rounded ease-in-out${
                    isActive
                      ? "text-white bg-neutral-300/10 "
                      : "text-neutral-300 hover:text-white"
                  }`
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/sign-up"
                className={({ isActive }) =>
                  `text-sm  transition py-2 px-3 rounded ease-in-out${
                    isActive
                      ? "text-white bg-neutral-300/10 "
                      : "text-neutral-300 hover:text-white"
                  }`
                }
              >
                Create account
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
