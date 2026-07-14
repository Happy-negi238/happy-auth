import { useState } from "react";
import AuthNavigation from "../component/AuthNavigation";
import { type OauthSignUpTypes, OauthSignUpZod } from "./types";
import { z } from "zod";
import { oauthSignUp } from "@/api/axios/apps";

const OauthSignUpPage = () => {
  const [formData, setFormData] = useState<OauthSignUpTypes>({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const result = OauthSignUpZod.safeParse(formData);

    if (!result.success) {
      const fieldErrors = z.flattenError(result.error).fieldErrors;
      setErrors({
        fullName: fieldErrors?.fullName?.[0] || "",
        email: fieldErrors?.email?.[0] || "",
        phone: fieldErrors?.phone?.[0] || "",
        password: fieldErrors?.password?.[0] || "",
      });

      return;
    }

    setErrors({
      fullName: "",
      email: "",
      phone: "",
      password: "",
    });

    try {
      const response = await oauthSignUp(result.data);

      console.log(response.data);
      // Navigate or show success message here
    } catch (error) {
      console.error(error);
      // Show API error to the user
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-neutral-800 bg-[#0e0e0e] p-8 shadow-xl">
        <h1 className="mb-8 text-center text-2xl font-semibold text-white">
          <span className="bg-white font-semibold text-black rounded-md py-0.5 px-2.5">
            H
          </span>
          'auth
        </h1>

        <AuthNavigation />

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-neutral-300"
            >
              Name
            </label>

            <input
              id="name"
              type="text"
              required
              name="fullName"
              placeholder="Enter your name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-lg border border-neutral-700 text-sm bg-[#151515] px-3 py-2 text-white
               placeholder:text-neutral-500 placeholder:text-sm outline-none transition focus:border-neutral-600"
            />
          </div>
          {errors.fullName && (
            <p className="text-xs text-red-500">{errors.fullName}</p>
          )}

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
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-neutral-700 text-sm bg-[#151515] px-3 py-2 text-white 
              placeholder:text-neutral-500 placeholder:text-sm outline-none transition focus:border-neutral-600"
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email}</p>
          )}

          {/* Phone */}
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-neutral-300"
            >
              Phone
            </label>

            <input
              id="phone"
              type="tel"
              required
              placeholder="Enter your phone number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-neutral-700 text-sm bg-[#151515] px-3 py-2 text-white
            placeholder:text-neutral-500 placeholder:text-sm outline-none transition focus:border-neutral-600"
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-red-500">{errors.phone}</p>
          )}

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
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-neutral-700 text-sm bg-[#151515] px-3 py-2 text-white 
              placeholder:text-neutral-500 placeholder:text-sm outline-none transition focus:border-neutral-600"
            />
          </div>
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password}</p>
          )}

          <button
            type="submit"
            className="mt-3 w-full rounded-lg bg-white py-2 font-medium text-black transition hover:bg-neutral-200"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default OauthSignUpPage;
