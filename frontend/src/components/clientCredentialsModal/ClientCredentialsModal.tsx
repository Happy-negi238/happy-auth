import { Download, X } from "lucide-react";

type ClientCredentialsModalProps =  {
  open: boolean;
  onClose: () => void;
  clientId: string;
  clientSecret: string;
}

const ClientCredentialsModal = ({
  open,
  onClose,
  clientId,
  clientSecret,
}: ClientCredentialsModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-8">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-zinc-400 hover:text-white"
        >
          <X size={22} className="bg-white"/>
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
          onClick={onClose}
          className="mt-8 w-full rounded-xl bg-white py-3 font-semibold text-black hover:bg-zinc-200"
        >
          <Download/>Download
        </button>
      </div>
    </div>
  );
};

export default ClientCredentialsModal;
