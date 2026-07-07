const Home = () => {
  return (
    <main className="min-h-screen bg-[(--background)] px-24">
      <div className="mx-auto flex h-screen max-w-7xl items-center justify-between gap-20">
        <section className="max-w-xl">
          <span className="rounded-full border border-neutral-400 px-4 py-2 text-sm text-neutral-200">
            OpenID Connect Provider
          </span>

          <h1 className="mt-8 text-6xl font-bold text-neutral-200 leading-tight">
            Authentication
            <br />
            for modern
            <br />
            applications
          </h1>

          <p className="mt-8 text-md leading-8 text-neutral-300 ">
            Register your application, receive your Client ID, authorize users,
            and securely exchange authorization codes for tokens using OAuth 2.0
            and OpenID Connect.
          </p>

          <div className="mt-10 flex gap-4">
            <button className="rounded-lg bg-white px-6 py-3 font-semibold text-black hover:bg-zinc-200">
              Register App
            </button>

            <button className="rounded-lg border border-[(--border)] px-6 py-3">
              Documentation
            </button>
          </div>
        </section>

        <section className="w-125 rounded-2xl border p-8 shadow-2xl border-neutral-700">
          <div className="mb-8 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-400"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
            <div className="h-3 w-3 rounded-full bg-green-400"></div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-neutral-700 p-5">
              <p className="text-sm text-neutral-400">Registered Application</p>
              <h3 className="mt-2 text-xl font-bold">My Awesome App</h3>
              <p className="mt-3 text-sm text-[(--muted)]">Redirect URI</p>
              <code className="text-sm text-green-400">
                https://example.com/callback
              </code>
            </div>

            <div className="rounded-xl bg-black p-5 font-mono text-sm">
              <p className="text-zinc-500">GET /authorize</p>

              <p className="mt-3 text-green-400">
                ✓ Authorization Code Generated
              </p>

              <p className="mt-2 text-blue-400">code=4Af73X...</p>
            </div>

            <div className="rounded-xl border border-neutral-700 p-5">
              <p className="text-sm text-[(--muted)]">Access Token</p>

              <code className="mt-2 block break-all text-blue-400">
                eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
              </code>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
