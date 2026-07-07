import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/10 bg-[(--background)]/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
        <Link to="/" className="text-2xl font-bold">
          OIDC
        </Link>

        <nav className="flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold"
                : "text-neutral-300 hover:text-white transition"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/create-app"
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold"
                : "text-neutral-300 hover:text-white transition"
            }
          >
            Create-app
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-neutral-300 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-neutral-100 px-5 py-2 font-medium text-black"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
