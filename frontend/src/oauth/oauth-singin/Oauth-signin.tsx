import AuthNavigation from "../component/AuthNavigation";

const OauthSignInPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-neutral-800 bg-[#0e0e0e] p-8 shadow-xl">
        <h1 className="mb-8 text-center text-2xl text-white font-semibold">
          <span className="bg-white font-semibold text-black rounded-md py-0.5 px-2.5">
            H
          </span>
          'auth
        </h1>

        <AuthNavigation />

        <form className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-neutral-300"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              required
              placeholder="Enter your email"
              className="w-full rounded-lg border border-neutral-700 text-sm bg-[#151515] px-3 py-2 text-white
            placeholder:text-neutral-500 placeholder:text-sm outline-none transition focus:border-neutral-600"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-neutral-300"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              required
              placeholder="Enter your password"
              className="w-full rounded-lg border border-neutral-700 text-sm bg-[#151515] px-3 py-2 text-white 
              placeholder:text-neutral-500 placeholder:text-sm  outline-none transition focus:border-neutral-600"
            />
          </div>

          <button
            type="submit"
            className="mt-3 w-full rounded-lg bg-white py-2 font-medium text-black transition hover:bg-neutral-200"
          >
            Sign-in
          </button>
        </form>
      </div>
    </div>
  );
};

export default OauthSignInPage;
