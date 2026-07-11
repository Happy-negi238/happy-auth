import { developerSignUp } from "@/api/axios/apps";
import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const navigation = useNavigate();
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
      const response = await developerSignUp(formData);
      const { data } = await response;
      setMessage({
        type: "success",
        text: data?.message ?? "Account created successfully.",
      });
      setFormData({ fullName: "", email: "", password: "" });
      navigation("/sign-in");
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
        {/* Hierarchy: Clear, dominant header */}
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Create account
          </h2>
          <p className="text-sm text-zinc-400 mt-2">
            Get started with your free account today.
          </p>
        </header>

        {/* Proximity: Grouped inputs with consistent vertical rhythm */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-300">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full bg-[#1e1e1e] border border-[#333333] rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors"
              required
            />
          </div>

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
            <label className="text-sm font-medium text-zinc-300">
              Password
            </label>
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

          {/* Contrast: High contrast off-white button pops instantly */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f4f4f5] hover:bg-white disabled:cursor-not-allowed disabled:opacity-70 text-[#101010] font-semibold py-2 px-4 rounded-lg mt-2 transition-colors duration-200 shadow-sm"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <footer className="mt-8 text-center">
          <p className="text-sm text-zinc-400">
            Already have an account?{" "}
            <a
              href="/sign-in"
              className="text-white hover:underline font-medium"
            >
              Log in
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
