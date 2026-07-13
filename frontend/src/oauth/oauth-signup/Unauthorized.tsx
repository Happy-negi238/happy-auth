const Unauthorized = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10">
          <svg
            className="h-8 w-8 text-red-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M10.29 3.86 1.82 18A2 2 0 0 0 3.53 21h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
            />
          </svg>
        </div>

        <div className="mt-6 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Access Denied
          </h1>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            This authorization request could not be verified. The client
            application is invalid, untrusted, or the request has been tampered
            with.
          </p>
        </div>

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          <p className="text-sm leading-6 text-zinc-500">
            If you believe this is an error, contact the application developer
            and ensure you're using a valid authorization link.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
