export const IntegrationGuide = () => {
  const steps = [
    {
      number: "01",
      title: "Create Developer Account",
      description:
        "Sign up on our developer portal to get access to the dashboard and manage your applications.",
    },
    {
      number: "02",
      title: "Get Credentials",
      description:
        "Register a new application to immediately receive your unique `clientId` and `clientSecret` keys.",
    },
    {
      number: "03",
      title: "Authorize User",
      description:
        "Make a call to the `/authorization_endpoint` to authenticate users and receive an authorization code.",
    },
    {
      number: "04",
      title: "Exchange Token",
      description:
        "Securely send your code to the `/token_endpoint` to obtain an `access_token` for system access.",
    },
  ];

  return (
    <section className=" text-gray-200 py-20">
      <div className="">
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <span className="text-xs font-semibold uppercase tracking-wider bg-zinc-800 text-gray-400 px-3 py-1 rounded-full border border-zinc-700">
            Documentation
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-white">
            Integrate in 4 Simple Steps
          </h2>
          <p className="text-gray-400 mt-2 max-w-xl">
            Follow this streamlined workflow to securely implement our OAuth 2.0
            / OIDC provider into your backend stack.
          </p>
        </div>

        <hr className="border-zinc-800 mb-12" />

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative p-6 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Step Number Badge */}
                <div className="text-xs font-bold text-gray-500 bg-zinc-900 w-8 h-8 rounded-lg flex items-center justify-center border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                  {step.number}
                </div>

                {/* Step Title */}
                <h3 className="text-lg font-semibold text-white mt-4 mb-2">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-sm text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Aesthetic indicator line on hover */}
              <div className="w-full h-[2px] bg-zinc-800 group-hover:bg-emerald-500 mt-6 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
