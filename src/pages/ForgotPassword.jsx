import { useState } from "react";
import { Link } from "react-router-dom";
import AuthCard from "../components/Auth/LoginForm";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: replace with real API call
    setMessage("✅ If that email exists, a reset link has been sent.");
  };

  return (   
    <AuthCard>
  
      {message && (
        <div className="mb-5 rounded-xl bg-cyan-500/10 p-3 text-center text-cyan-400">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-xl bg-[#1B263B] border border-white/10 p-4 text-white outline-none focus:border-cyan-400"
        />
        <button
          type="submit"
          className="w-full rounded-xl bg-cyan-500 py-4 font-bold text-black hover:scale-105 transition"
        >
          Send Reset Link
        </button>
      </form>

      <p className="text-center mt-5 text-gray-400">
        <Link to="/" className="text-cyan-400 hover:underline">
          Back to Login
        </Link>
      </p>
    </AuthCard>
  );
}