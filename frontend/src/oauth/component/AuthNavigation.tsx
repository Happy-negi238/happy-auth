import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

const AuthNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const clientId = searchParams.get("client_id");

  const isSignUp = location.pathname === "/o/auth";
  const isSignIn = location.pathname === "/o/auth/sign-in";

  return (
    <div className="flex w-full max-w-md rounded-lg bg-[#0e0e0e] p-1 mb-4">
      <button
        onClick={() => navigate(`/o/auth?client_id=${clientId}`)}
        className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition ${
          isSignUp ? "bg-white text-black" : "text-neutral-400 hover:text-white"
        }`}
      >
        Sign Up
      </button>

      <button
        onClick={() => navigate(`/o/auth/sign-in?client_id=${clientId}`)}
        className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition ${
          isSignIn ? "bg-white text-black" : "text-neutral-400 hover:text-white"
        }`}
      >
        Sign In
      </button>
    </div>
  );
};

export default AuthNavigation;
