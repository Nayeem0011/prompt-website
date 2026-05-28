import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp({ onNavigate }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirm: "",
        role: "buyer",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [agreed, setAgreed] = useState(false);

    const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

    const passwordStrength = () => {
        const p = form.password;
        if (!p) return 0;
        let s = 0;
        if (p.length >= 8) s++;
        if (/[A-Z]/.test(p)) s++;
        if (/[0-9]/.test(p)) s++;
        if (/[^A-Za-z0-9]/.test(p)) s++;
        return s;
    };

    const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
    const strengthColor = ["", "#ef4444", "#f59e0b", "#3b82f6", "#22c55e"];
    const strength = passwordStrength();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!form.name || !form.email || !form.password || !form.confirm) {
            setError("Please fill in all fields.");
            return;
        }
        if (form.password !== form.confirm) {
            setError("Passwords do not match.");
            return;
        }
        if (!agreed) {
            setError("Please agree to the terms of service.");
            return;
        }
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1400));
        setLoading(false);
        alert("Account created!");
    };

    return (
        <div className="bg-[#07070d] flex items-center justify-center py-12 px-4">
            <div className="relative w-full max-w-md">
                {/* Logo */}
                <Link to="/" className="flex items-center justify-center gap-3 mb-10">
                    <div className="w-9 h-9 bg-linear-to-br from-violet-500 to-fuchsia-600 rounded-xl flex items-center justify-center">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M4 9h10M9 4v10" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                            <circle cx="9" cy="9" r="3" stroke="white" strokeWidth="1.5" />
                        </svg>
                    </div>
                    <span className="text-white font-semibold text-xl tracking-tight">
                        Prompt<span className="text-fuchsia-400">Hub</span>
                    </span>
                </Link>

                {/* Card */}
                <div className="bg-white/3 border border-white/8 rounded-2xl p-8">
                    <h1 className="text-white text-[22px] font-semibold mb-1">Create your account</h1>
                    <p className="text-white/40 text-sm mb-6">Join thousands of prompt creators</p>

                    {/* Role selector */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        {["buyer", "seller"].map((role) => (
                            <button
                                key={role}
                                type="button"
                                onClick={() => update("role", role)}
                                className={`flex flex-col items-center gap-2 rounded-xl border py-4 px-3 transition-all duration-200 ${form.role === role
                                    ? "border-fuchsia-500/50 bg-fuchsia-500/10"
                                    : "border-white/[0.07] bg-white/3 hover:bg-white/6"
                                    }`}
                            >
                                {role === "buyer" ? (
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                                        <circle cx="11" cy="8" r="3.5" stroke={form.role === "buyer" ? "#e879f9" : "rgba(255,255,255,0.3)"} strokeWidth="1.5" />
                                        <path d="M4 19c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke={form.role === "buyer" ? "#e879f9" : "rgba(255,255,255,0.3)"} strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                ) : (
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                                        <path d="M11 3v16M5 7l6-4 6 4" stroke={form.role === "seller" ? "#e879f9" : "rgba(255,255,255,0.3)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <rect x="5" y="10" width="12" height="9" rx="1.5" stroke={form.role === "seller" ? "#e879f9" : "rgba(255,255,255,0.3)"} strokeWidth="1.5" />
                                    </svg>
                                )}
                                <div className="text-center">
                                    <div className={`text-sm font-medium capitalize ${form.role === role ? "text-fuchsia-300" : "text-white/50"}`}>
                                        {role}
                                    </div>
                                    <div className="text-[11px] text-white/25 mt-0.5">
                                        {role === "buyer" ? "Use prompts" : "Sell prompts"}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Google OAuth */}
                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/9 border border-white/9 hover:border-white/[0.14] rounded-xl py-3 text-sm font-medium text-white/75 hover:text-white transition-all duration-200 mb-6"
                    >
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                            <path d="M16.3 8.7c0-.6-.1-1.2-.2-1.7H8.5v3.2h4.4c-.2 1-.8 1.9-1.6 2.4v2h2.6c1.5-1.4 2.4-3.5 2.4-5.9z" fill="#4285F4" />
                            <path d="M8.5 17c2.2 0 4-0.7 5.4-2l-2.6-2c-.7.5-1.7.8-2.8.8-2.1 0-3.9-1.4-4.6-3.4H1.3v2C2.7 15.1 5.4 17 8.5 17z" fill="#34A853" />
                            <path d="M3.9 10.4c-.2-.5-.3-1-.3-1.4 0-.5.1-1 .3-1.4V5.6H1.3C.5 6.9 0 8.4 0 10s.5 3.1 1.3 4.4l2.6-2z" fill="#FBBC05" />
                            <path d="M8.5 3.4c1.2 0 2.3.4 3.1 1.2l2.3-2.3C12.5.9 10.7 0 8.5 0 5.4 0 2.7 1.9 1.3 4.6l2.6 2c.7-2 2.5-3.2 4.6-3.2z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-4 mb-5">
                        <div className="flex-1 border-t border-white/[0.07]" />
                        <span className="text-xs text-white/20">or</span>
                        <div className="flex-1 border-t border-white/[0.07]" />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
                                {error}
                            </div>
                        )}

                        {/* Full name */}
                        <div>
                            <label className="block text-xs font-medium text-white/50 mb-1.5">Full name</label>
                            <div className="relative">
                                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                        <circle cx="7.5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
                                        <path d="M2.5 13.5c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => update("name", e.target.value)}
                                    placeholder="Your full name"
                                    className="w-full bg-white/5 border border-white/8 focus:border-fuchsia-500/50 focus:bg-white/[0.07] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-medium text-white/50 mb-1.5">Email address</label>
                            <div className="relative">
                                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                        <rect x="1" y="3" width="13" height="9" rx="2" stroke="currentColor" strokeWidth="1.3" />
                                        <path d="M1 5l6 4 6-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => update("email", e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full bg-white/5 border border-white/8 focus:border-fuchsia-500/50 focus:bg-white/[0.07] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-medium text-white/50 mb-1.5">Password</label>
                            <div className="relative">
                                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                        <rect x="3" y="6" width="9" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                                        <path d="M5 6V4.5a2.5 2.5 0 015 0V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={form.password}
                                    onChange={(e) => update("password", e.target.value)}
                                    placeholder="Min. 8 characters"
                                    className="w-full bg-white/5 border border-white/8 focus:border-fuchsia-500/50 focus:bg-white/[0.07] rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors"
                                >
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                        <path d="M1 8C2.5 5 4.8 3.5 7.5 3.5S12.5 5 14 8c-1.5 3-3.8 4.5-6.5 4.5S2.5 11 1 8z" stroke="currentColor" strokeWidth="1.3" />
                                        <circle cx="7.5" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
                                    </svg>
                                </button>
                            </div>
                            {/* Strength bar */}
                            {form.password && (
                                <div className="mt-2">
                                    <div className="flex gap-1 mb-1">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div
                                                key={i}
                                                className="h-1 flex-1 rounded-full transition-all duration-300"
                                                style={{ background: i <= strength ? strengthColor[strength] : "rgba(255,255,255,0.08)" }}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-[11px]" style={{ color: strengthColor[strength] }}>
                                        {strengthLabel[strength]}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Confirm password */}
                        <div>
                            <label className="block text-xs font-medium text-white/50 mb-1.5">Confirm password</label>
                            <div className="relative">
                                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                        <path d="M3 7.5l3 3 6-6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    value={form.confirm}
                                    onChange={(e) => update("confirm", e.target.value)}
                                    placeholder="Repeat your password"
                                    className={`w-full bg-white/5 border rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200 ${form.confirm && form.confirm !== form.password
                                        ? "border-red-500/40 focus:border-red-500/60"
                                        : form.confirm && form.confirm === form.password
                                            ? "border-green-500/40 focus:border-green-500/60"
                                            : "border-white/8 focus:border-fuchsia-500/50"
                                        } focus:bg-white/[0.07]`}
                                />
                                {form.confirm && (
                                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                                        {form.confirm === form.password ? (
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                <circle cx="7" cy="7" r="6" stroke="#22c55e" strokeWidth="1.3" />
                                                <path d="M4.5 7l2 2 3-3" stroke="#22c55e" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        ) : (
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                <circle cx="7" cy="7" r="6" stroke="#ef4444" strokeWidth="1.3" />
                                                <path d="M5 5l4 4M9 5L5 9" stroke="#ef4444" strokeWidth="1.3" strokeLinecap="round" />
                                            </svg>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="flex items-start gap-2.5 pt-1">
                            <div
                                onClick={() => setAgreed(!agreed)}
                                className={`w-4 h-4 mt-0.5 shrink-0 border rounded-md flex items-center justify-center cursor-pointer transition-all duration-150 ${agreed ? "bg-fuchsia-600 border-fuchsia-600" : "border-white/15 bg-white/4"
                                    }`}
                            >
                                {agreed && (
                                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                                        <path d="M1.5 4.5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </div>
                            <span className="text-xs text-white/35 leading-relaxed">
                                I agree to the{" "}
                                <button type="button" className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors">
                                    Terms of Service
                                </button>{" "}
                                and{" "}
                                <button type="button" className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors">
                                    Privacy Policy
                                </button>
                            </span>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-60 rounded-xl py-3 text-sm font-semibold text-white transition-all duration-200 mt-2 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                        <circle cx="7.5" cy="7.5" r="6" stroke="white" strokeWidth="1.5" strokeDasharray="20" strokeDashoffset="10" strokeLinecap="round" />
                                    </svg>
                                    Creating account...
                                </>
                            ) : (
                                "Create account"
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer link */}
                <p className="text-center text-sm text-white/30 mt-6">
                    Already have an account?{" "}
                    <Link to="/login">
                        <button
                            onClick={() => onNavigate && onNavigate("login")}
                            className="text-fuchsia-400 hover:text-fuchsia-300 font-medium transition-colors"
                        >
                            Sign in
                        </button>
                    </Link>
                </p>
            </div>
        </div>
    );
}
