import { useEffect, useState } from "react";
import { z } from "zod";
import { registerApp } from "@/api/axios/apps";
import ClientCredentialsModal from "../clientCredentialsModal/ClientCredentialsModal";
import { RegisterTypeZod, type RegisterTypeZodTypes } from "./types";

type ResponseType = {
  readonly clientId: string;
  readonly clientSecret: string;
};

const CreateApp = () => {
  const [data, setdata] = useState<ResponseType | null>();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({
    appName: "",
    appUrl: "",
    redirectUri: "",
  });

  useEffect(() => {
    if (data?.clientId && data.clientSecret) {
      setOpenModal(true);
    }
  }, [data]);

  const [formData, setFormData] = useState<RegisterTypeZodTypes>({
    appName: "",
    appUrl: "",
    redirectUri: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const result = RegisterTypeZod.safeParse(formData);

    if (!result.success) {
      const fieldErrors = z.flattenError(result.error).fieldErrors;
      setErrors({
        appName: fieldErrors?.appName?.[0] || "",
        appUrl: fieldErrors?.appUrl?.[0] || "",
        redirectUri: fieldErrors?.redirectUri?.[0] || "",
      });
      return;
    }

    setErrors({
      appName: "",
      appUrl: "",
      redirectUri: "",
    });

    try {
      setLoading(true);
      const response = await registerApp(result.data);
      console.log("create: ", response);
      setdata(response.data.data as ResponseType);

      setFormData({
        appName: "",
        appUrl: "",
        redirectUri: "",
      });
    } catch (error) {
      console.error("Failed to register application:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-black px-6 py-16">
      <div className="mx-auto max-w-xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-semibold text-white">
            Register your application
          </h1>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-[#0e0e0e] p-8 backdrop-blur">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-200">
                Application Name
              </label>

              <input
                type="text"
                name="appName"
                value={formData.appName}
                onChange={handleChange}
                placeholder="My Awesome App"
                className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white 
                placeholder:text-zinc-500 placeholder:text-sm outline-none transition focus:border-zinc-500"
              />
              {errors.appName && (
                <p className="mt-2 text-sm text-red-500">{errors.appName}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-200">
                Application URL
              </label>

              <input
                type="url"
                name="appUrl"
                value={formData.appUrl}
                onChange={handleChange}
                placeholder="https://myapp.com"
                className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white 
                placeholder:text-zinc-500 placeholder:text-sm outline-none transition focus:border-zinc-500"
              />
              {errors.appUrl && (
                <p className="mt-2 text-sm text-red-500">{errors.appUrl}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-200">
                Redirect URI
              </label>

              <input
                type="url"
                name="redirectUri"
                value={formData.redirectUri}
                onChange={handleChange}
                placeholder="https://myapp.com/callback"
                className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white 
                placeholder:text-zinc-500 placeholder:text-sm outline-none transition focus:border-zinc-500"
              />
              {errors.redirectUri && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.redirectUri}
                </p>
              )}

              <p className="mt-2 text-sm text-zinc-500">
                Users will be redirected to this URL after successful
                authentication.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`mt-4 w-full rounded-md bg-white py-2 font-semibold 
                text-black transition disabled:cursor-not-allowed disabled:opacity-70
                 ${loading ? "bg-white/30" : "bg-white"}`}
            >
              {loading ? "Registering.." : "Register"}
            </button>
          </form>
        </div>

        <ClientCredentialsModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          clientId={data?.clientId ?? ""}
          clientSecret={data?.clientSecret ?? ""}
        />
      </div>
    </main>
  );
};

export default CreateApp;
