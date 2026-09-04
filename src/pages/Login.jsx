 import LoginForm from "../components/Auth/LoginForm";

function Login() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-transparent to-violet-600/15" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-6xl items-center justify-items-center gap-10 px-4 py-10 lg:grid-cols-2 lg:justify-items-stretch lg:px-8">
        <section className="hidden lg:block">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-300">
            BitPal Trade
          </p>
          <h1 className="text-5xl font-bold leading-tight tracking-tight">
            Trade smarter.
            <span className="mt-2 block bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">
              Sign in to your dashboard.
            </span>
          </h1>
          

          <div className="mt-10 grid max-w-md grid-cols-3 gap-3">
            {[
              ["24/7", "Markets"],
              ["Live", "Alerts"],
              ["Secure", "Access"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4 text-center backdrop-blur-sm"
              >
                <p className="text-lg font-bold text-white">{value}</p>
                <p className="mt-1 text-xs text-gray-400">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <LoginForm />
      </div>
    </div>
  );
}

export default Login;