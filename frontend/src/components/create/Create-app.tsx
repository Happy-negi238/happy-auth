import { useEffect, useState } from "react";
import { registerApp } from "@/api/axios/apps";
import ClientCredentialsModal from "../clientCredentialsModal/ClientCredentialsModal";

type ResponseType = {
  readonly clientId: string;
  readonly clientSecret: string;
} ;

const CreateApp = () => {
  const [data, setdata] = useState<ResponseType | null>();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  
  useEffect(() => {
    if (data?.clientId && data.clientSecret) {
      setOpenModal(true);
    }
  }, [data]);

  const [formData, setFormData] = useState({
    appName: "",
    appUrl: "",
    redirectUri: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await registerApp(formData);
      
      setdata(response.data as ResponseType);

      // Optional: Clear the form
      setFormData({
        appName: "",
        appUrl: "",
        redirectUri: "",
      });
      setLoading(false);
    } catch (error) {
      console.error("Failed to register application:", error);
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
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-white placeholder:text-zinc-500 outline-none transition focus:border-zinc-500"
              />
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
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-white placeholder:text-zinc-500 outline-none transition focus:border-zinc-500"
              />
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
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-white placeholder:text-zinc-500 outline-none transition focus:border-zinc-500"
              />

              <p className="mt-2 text-sm text-zinc-500">
                Users will be redirected to this URL after successful
                authentication.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`mt-4 w-full rounded-xl bg-white py-3 font-semibold 
                text-black transition hover:bg-zinc-200 ${loading ? "bg-white/30" : "bg-white"}`}
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
