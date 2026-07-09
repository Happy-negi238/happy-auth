import { developerSignIn } from "@/api/axios/apps";
import React, { useState } from "react";

export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await developerSignIn(formData);
      setMessage({
        type: "success",
        text: response?.message || "Signed in successfully.",
      });
      setFormData({ email: "", password: "" });
    } catch (error: unknown) {
      const apiMessage =
        error && typeof error === "object" && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined;

      setMessage({
        type: "error",
        text: apiMessage || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center font-sans px-4">
      <div className="w-full max-w-md bg-[#0e0e0e] border border-[#262626] rounded-xl p-8 shadow-2xl">
        {/* Hierarchy: Matches the SignUp scale for consistency */}
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Welcome back
          </h2>
          <p className="text-sm text-zinc-400 mt-2">
            Welcome back! Please enter your details.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-300">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full bg-[#1e1e1e] border border-[#333333] rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-zinc-300">
                Password
              </label>
              <a
                href="#forgot"
                className="text-xs text-zinc-400 hover:text-white transition-colors"
              >
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-[#1e1e1e] border border-[#333333] rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors"
              required
            />
          </div>

          {message ? (
            <div
              className={`rounded-lg border px-3 py-2 text-sm ${
                message.type === "success"
                  ? "border-emerald-600/30 bg-emerald-600/10 text-emerald-400"
                  : "border-red-600/30 bg-red-600/10 text-red-400"
              }`}
            >
              {message.text}
            </div>
          ) : null}

          {/* Contrast: High contrast button to anchor user action */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f4f4f5] hover:bg-white disabled:cursor-not-allowed disabled:opacity-70 text-[#101010] font-semibold py-2 px-4 rounded-lg mt-2 transition-colors duration-200 shadow-sm"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <footer className="mt-8 text-center">
          <p className="text-sm text-zinc-400">
            Don't have an account?{" "}
            <a
              href="/sign-up"
              className="text-white hover:underline font-medium"
            >
              Sign up for free
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
