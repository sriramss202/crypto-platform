import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  UserPlus,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { registerWithEmailPassword } from "../../firebase/auth";

function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
    setIsSuccess(false);
  };

  // ==========================================
  // FORM SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setIsSuccess(false);

    // 1. PASSWORD MATCH
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    // 2. PASSWORD LENGTH
    if (formData.password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    // 3. PHONE VALIDATION
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(formData.phone)) {
      setMessage("Phone number must contain exactly 10 digits.");
      return;
    }

    try {
      setLoading(true);

      // 4. FIREBASE REGISTRATION
      const result = await registerWithEmailPassword(
        formData.email,
        formData.password,
        formData.phone
      );

      // 5. REGISTRATION FAILED
      if (!result.success) {
        setIsSuccess(false);
        setMessage("❌ " + (result.message || "Registration failed."));
        return;
      }

      // 6. REGISTRATION SUCCESS
      setIsSuccess(true);
      setMessage("✓ Account created successfully! Redirecting...");

      // Clear form
      setFormData({
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);
      setIsSuccess(false);
      setMessage("❌ Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="flex min-h-[620px] w-full items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl border border-cyan-500/20 bg-[#101827]/90 p-6 sm:p-8 shadow-[0_0_50px_-12px_rgba(34,211,238,0.2)] backdrop-blur-xl">
        
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
              BitPal Trade
            </span>
            <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
              Create Account
            </h1>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-md">
            <UserPlus size={13} />
            New User
          </div>
        </div>

        {/* MESSAGE DISPLAY */}
        {message && (
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

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* EMAIL INPUT */}
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
                autoComplete="email"
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 py-3 pl-10 pr-4 text-xs text-white placeholder-slate-500 outline-none transition-all focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
              />
            </div>
          </div>

          {/* PHONE INPUT */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-300">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10 digit mobile number"
                required
                maxLength={10}
                inputMode="numeric"
                autoComplete="tel"
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 py-3 pl-10 pr-4 text-xs text-white placeholder-slate-500 outline-none transition-all focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
              />
            </div>
          </div>

          {/* PASSWORD INPUT */}
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
                placeholder="At least 6 characters"
                required
                minLength={6}
                autoComplete="new-password"
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

          {/* CONFIRM PASSWORD INPUT */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-300">
              Confirm Password
            </label>
            <div className="relative">
              <ShieldCheck className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                required
                minLength={6}
                autoComplete="new-password"
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 py-3 pl-10 pr-10 text-xs text-white placeholder-slate-500 outline-none transition-all focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 py-3.5 text-xs font-bold text-slate-950 transition-all hover:from-cyan-300 hover:to-cyan-400 shadow-lg shadow-cyan-500/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                <span>Creating Account...</span>
              </div>
            ) : (
              <>
                <span>Get Started</span>
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </>
            )}
          </button>
        </form>

        {/* FOOTER LINK */}
        <p className="mt-6 text-center text-xs text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-cyan-400 hover:text-cyan-300 underline-offset-4 hover:underline"
          >
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}

export default RegisterForm;