import { useAuth } from "@/context/AuthContext";
import QuickStart from "../quick-start/QuickStart";
import { Link } from "react-router-dom";

const Home = () => {
  const { isAuthenticated } = useAuth();
  return (
    <main className=" bg-[(--background)]  mx-auto max-w-275">
      <div className="flex h-screen  items-center justify-between gap-10">
        <section className="max-w-xl">
          <span className="rounded-full border border-neutral-400 px-4 py-2 text-xs text-neutral-200">
            OpenID Connect Provider
          </span>

          <h1 className="mt-8 text-6xl font-bold text-neutral-200 leading-18">
            Authentication
            <br />
            for modern
            <br />
            applications
          </h1>

          <p className="mt-8 text-md leading-7 text-neutral-300 ">
            Register your application, receive your Client ID, authorize users,
            and securely exchange authorization codes for tokens using OAuth 2.0
            and OpenID Connect.
          </p>

          <div className="mt-10 flex gap-4">
            {isAuthenticated ? (
              <Link to="/create-app">
                <button
                  className="
                    rounded-md
                    border border-zinc-300
                    bg-white/90
                    px-6 py-2
                    text-lg font-medium text-zinc-900
                    shadow-[0_2px_8px_rgba(255,255,255,0.35),0_8px_20px_rgba(0,0,0,0.25),inset_0_0px_2px_rgba(0,0,0,0.8)]
                    transition-all
                    duration-200
                    hover:shadow-[0_4px_12px_rgba(255,255,255,0.45),0_12px_24px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.9)]
                    active:translate-y-0
                    active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.15)]"
                >
                  Create app
                </button>
              </Link>
            ) : (
              <>
                <Link to="/sign-in">
                  <button
                    className="
                    rounded-md
                    border border-zinc-300
                    bg-white/90
                    px-6 py-2
                    text-lg font-medium text-zinc-900
                    shadow-[0_2px_8px_rgba(255,255,255,0.35),0_8px_20px_rgba(0,0,0,0.25),inset_0_0px_2px_rgba(0,0,0,0.8)]
                    transition-all
                    duration-200
                    hover:shadow-[0_4px_12px_rgba(255,255,255,0.45),0_12px_24px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.9)]
                    active:translate-y-0
                    active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.15)]"
                  >
                    Sign in
                  </button>
                </Link>

                <Link to="/sign-up">
                  <button className="rounded-md border border-neutral-700 px-6 py-2 hover:border-neutral-500">
                    Create account
                  </button>
                </Link>
              </>
            )}
          </div>
        </section>

        <section
          className="w-125 rounded-2xl border p-4 border-neutral-800/70 bg-neutral-950
        shadow-[inset_0_0px_7px_rgba(255,255,255,0.1)]"
        >
          <div className="mb-8 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-400"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
            <div className="h-3 w-3 rounded-full bg-green-400"></div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-neutral-900 p-5">
              <p className="text-sm text-neutral-400">Registered Application</p>
              <h3 className="mt-2 text-xl font-bold">My Awesome App</h3>
              <p className="mt-3 text-sm text-[(--muted)]">Redirect URI</p>
              <code className="text-sm text-green-500/90">
                https://example.com/callback
              </code>
            </div>

            <div className="rounded-xl bg-neutral-600/20 p-5 font-mono text-sm">
              <p className="text-zinc-500">GET /authorize</p>

              <p className="mt-3 text-green-500/90">
                ✓ Authorization Code Generated
              </p>

              <p className="mt-2 text-blue-400">code=4Af73X...</p>
            </div>

            <div className="rounded-xl border border-neutral-900 p-5">
              <p className="text-sm text-[(--muted)]">Access Token</p>

              <code className="mt-2 block break-all text-blue-400">
                eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
              </code>
            </div>
          </div>
        </section>
      </div>
      <QuickStart />
    </main>
  );
};

export default Home;
