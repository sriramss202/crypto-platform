import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, Shield, User, ArrowRight } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import { loginWithGoogle, loginWithEmailPassword } from "../../firebase/auth";
import { loginAdmin, setUserSession } from "../../utils/auth";
import Avatar from "../Common/Avatar";

function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loginType, setLoginType] = useState("user"); // "user" | "admin"
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [googleConnected, setGoogleConnected] = useState(false);
  const [connectedUser, setConnectedUser] = useState(null);

  // =====================================================
  // INPUT CHANGE & RESET
  // =====================================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setMessage("");
    setIsSuccess(false);
  };

  const handleTypeSwitch = (type) => {
    if (type === loginType) return;
    setLoginType(type);
    setFormData({ email: "", password: "" });
    setMessage("");
    setIsSuccess(false);
  };

  // =====================================================
  // SUBMIT HANDLER
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSuccess(false);

    // ADMIN LOGIN
    if (loginType === "admin") {
      const result = loginAdmin(formData.email, formData.password);

      if (result.success) {
        setIsSuccess(true);
        setMessage("Admin authentication verified. Accessing portal...");
        setTimeout(() => navigate("/admin"), 1000);
      } else {
        setIsSuccess(false);
        setMessage(result.message || "Invalid administrator credentials.");
      }
      return;
    }

    // USER LOGIN
    try {
      setMessage("Authenticating user...");
      const result = await loginWithEmailPassword(
        formData.email,
        formData.password
      );

      if (!result.success) {
        setIsSuccess(false);
        setMessage("❌ " + (result.message || "Invalid credentials provided."));
        return;
      }

      setUserSession(result.user);
      setIsSuccess(true);
      setMessage("✓ Welcome to BitPal Trade...!");
      setTimeout(() => navigate("/app"), 1000);
    } catch (error) {
      console.error("Login error:", error);
      setIsSuccess(false);
      setMessage("❌ Connection error. Please try again.");
    }
  };

  // =====================================================
  // GOOGLE SIGN IN
  // =====================================================

  const handleGoogleSignIn = async () => {
    try {
      setMessage("");
      setIsSuccess(false);
      setIsGoogleLoading(true);

      const result = await loginWithGoogle();

      if (!result.success) {
        setIsSuccess(false);
        setMessage("❌ " + (result.message || "Google auth failed."));
        return;
      }

      setUserSession(result.user);
      setGoogleConnected(true);
      setConnectedUser(result.user);
      setIsSuccess(true);

      const displayName =
        result.user.displayName ||
        result.user.email?.split("@")[0] ||
        "User";

      setMessage(`✓ Welcome, ${displayName}! Redirecting...`);
      setTimeout(() => navigate("/app"), 1200);
    } catch (error) {
      console.error("Google login error:", error);
      setIsSuccess(false);
      setMessage(error.message || "Unable to authorize via Google.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // =====================================================
  // UI HELPERS
  // =====================================================

  const isAdmin = loginType === "admin";

  return (
    <div className="flex min-h-[620px] w-full items-center justify-center p-4">
      {/* 3D PERSPECTIVE CONTAINER */}
      <div className="relative w-full max-w-md [perspective:1000px]">
        {/* ROTATING CARD WRAPPER */}
        <div
          className={`relative w-full transition-transform duration-700 [transform-style:preserve-3d] ${
            isAdmin ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* ===================================================== */}
          {/* FRONT SIDE: USER LOGIN                                */}
          {/* ===================================================== */}
          <div className="w-full rounded-3xl border border-cyan-500/20 bg-[#101827]/90 p-6 sm:p-8 shadow-[0_0_50px_-12px_rgba(34,211,238,0.2)] backdrop-blur-xl [backface-visibility:hidden]">
            
            {/* HEADER */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
                  BitPal Trade
                </span>
                <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
                  Welcome Back
                </h1>
              </div>

              <div className="flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-md">
                <User size={13} />
                User Mode
              </div>
            </div>

            {/* TOGGLE BUTTONS */}
            <div className="mb-6 grid grid-cols-2 gap-1 rounded-xl bg-slate-950/60 p-1.5 border border-white/5">
              <button
                type="button"
                onClick={() => handleTypeSwitch("user")}
                className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25 transition-all"
              >
                <User size={14} /> User Login
              </button>
              <button
                type="button"
                onClick={() => handleTypeSwitch("admin")}
                className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold text-slate-400 hover:text-white transition-all"
              >
                <Shield size={14} /> Admin Access
              </button>
            </div>

            {/* MESSAGES */}
            {message && !isAdmin && (
              <div
                className={`mb-5 rounded-xl border p-3.5 text-center text-xs sm:text-sm font-medium transition-all ${
                  isSuccess
                    ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-300"
                    : "border-rose-500/40 bg-rose-500/10 text-rose-300"
                }`}
              >
                <p>{message}</p>
                {connectedUser && isSuccess && (
                  <div className="mt-2.5 flex items-center justify-center gap-2.5 rounded-lg border border-cyan-400/20 bg-cyan-950/40 p-2">
                    <Avatar user={connectedUser} size="xs" />
                    <div className="text-left text-xs">
                      <p className="font-semibold text-white">
                        {connectedUser.displayName || "Google User"}
                      </p>
                      <p className="text-cyan-300/80 text-[11px]">
                        {connectedUser.email}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* GOOGLE SIGN IN */}
            <button
              type="button"
              disabled={isGoogleLoading || googleConnected}
              onClick={handleGoogleSignIn}
              className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-slate-900/60 py-3 font-semibold text-white transition-all hover:border-cyan-400/40 hover:bg-slate-800/80 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isGoogleLoading ? (
                <div className="flex items-center gap-2 text-cyan-400">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
                  <span className="text-xs font-semibold">Connecting...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2.5 text-xs font-bold text-slate-200">
                  <FcGoogle size={18} className="transition-transform group-hover:scale-110" />
                  <span>
                    {googleConnected
                      ? "Google Account Connected"
                      : "Continue with Google"}
                  </span>
                </div>
              )}
            </button>

            <div className="relative my-5 flex items-center justify-center">
              <div className="w-full border-t border-slate-800" />
              <span className="absolute bg-[#101827] px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                OR EMAIL
              </span>
            </div>

            {/* USER FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border border-white/10 bg-slate-950/60 py-3 pl-10 pr-4 text-xs text-white placeholder-slate-500 outline-none transition-all focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••••••"
                    required
                    className="w-full rounded-xl border border-white/10 bg-slate-950/60 py-3 pl-10 pr-10 text-xs text-white placeholder-slate-500 outline-none transition-all focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 py-3 text-xs font-bold text-slate-950 transition-all hover:from-cyan-300 hover:to-cyan-400 shadow-lg shadow-cyan-500/20 active:scale-[0.98]"
              >
                <span>Sign In as User</span>
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-slate-400">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-cyan-400 hover:text-cyan-300 underline-offset-4 hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>

          {/* ===================================================== */}
          {/* BACK SIDE: ADMIN LOGIN                                */}
          {/* ===================================================== */}
          <div className="absolute top-0 left-0 w-full rounded-3xl border border-cyan-500/20 bg-[#101827]/90 p-6 sm:p-8 shadow-[0_0_50px_-12px_rgba(34,211,238,0.2)] backdrop-blur-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
            
            {/* HEADER */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
                  BitPal Trade
                </span>
                <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
                  Admin Portal
                </h1>
              </div>

              <div className="flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-md">
                <Shield size={13} />
                Admin Mode
              </div>
            </div>

            {/* TOGGLE BUTTONS */}
            <div className="mb-6 grid grid-cols-2 gap-1 rounded-xl bg-slate-950/60 p-1.5 border border-white/5">
              <button
                type="button"
                onClick={() => handleTypeSwitch("user")}
                className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold text-slate-400 hover:text-white transition-all"
              >
                <User size={14} /> User Login
              </button>
              <button
                type="button"
                onClick={() => handleTypeSwitch("admin")}
                className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25 transition-all"
              >
                <Shield size={14} /> Admin Access
              </button>
            </div>

            {/* MESSAGES */}
            {message && isAdmin && (
              <div
                className={`mb-5 rounded-xl border p-3.5 text-center text-xs sm:text-sm font-medium transition-all ${
                  isSuccess
                    ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-300"
                    : "border-rose-500/40 bg-rose-500/10 text-rose-300"
                }`}
              >
                <p>{message}</p>
              </div>
            )}

            {/* ADMIN FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                  Administrator Email
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@bitpal.com"
                    required
                    className="w-full rounded-xl border border-white/10 bg-slate-950/60 py-3 pl-10 pr-4 text-xs text-white placeholder-slate-500 outline-none transition-all focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••••••"
                    required
                    className="w-full rounded-xl border border-white/10 bg-slate-950/60 py-3 pl-10 pr-10 text-xs text-white placeholder-slate-500 outline-none transition-all focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 py-3 text-xs font-bold text-slate-950 transition-all hover:from-cyan-300 hover:to-cyan-400 shadow-lg shadow-cyan-500/20 active:scale-[0.98]"
              >
                <span>Sign In as Administrator</span>
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;