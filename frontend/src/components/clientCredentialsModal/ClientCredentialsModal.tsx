import { Download, X } from "lucide-react";

type ClientCredentialsModalProps = {
  open: boolean;
  onClose: () => void;
  clientId: string;
  clientSecret: string;
};

const ClientCredentialsModal = ({
  open,
  onClose,
  clientId,
  clientSecret,
}: ClientCredentialsModalProps) => {
  if (!open) return null;

  const handleDownload = () => {
    const content = `
    Client ID:
    ${clientId}

    Client Secret:
    ${clientSecret}`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "oidc-credentials.txt";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-8">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-zinc-400 hover:text-zinc-200"
        >
          <X size={22} className="" />
        </button>

        <h2 className="mb-2 text-2xl font-semibold text-white">
          Application Registered
        </h2>

        <p className="mb-8 text-zinc-400">
          Save these credentials securely. The client secret won't be shown
          again.
        </p>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Client ID
            </label>

            <input
              readOnly
              value={clientId}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Client Secret
            </label>

            <input
              readOnly
              value={clientSecret}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white"
            />
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="mt-8 w-full rounded-md flex items-center justify-center gap-1.5 
          bg-white py-2 font-semibold text-black text-md hover:bg-zinc-200"
        >
          <Download size={18} />
          Download
        </button>
      </div>
    </div>
  );
};

export default ClientCredentialsModal;
