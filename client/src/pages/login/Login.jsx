import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login({ onNavigate }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1200));
        setLoading(false);
        // TODO: connect to your auth logic
        alert("Logged in!");
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
                    <h1 className="text-white text-[22px] font-semibold mb-1">Welcome back</h1>
                    <p className="text-white/40 text-sm mb-8">Sign in to your account to continue</p>

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
                    <div className="flex items-center gap-4 mb-6">
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full bg-white/5 border border-white/8 focus:border-fuchsia-500/50 focus:bg-white/[0.07] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-xs font-medium text-white/50">Password</label>
                                <button
                                    type="button"
                                    className="text-xs text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <div className="relative">
                                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                        <rect x="3" y="6" width="9" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                                        <path d="M5 6V4.5a2.5 2.5 0 015 0V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                                        <circle cx="7.5" cy="9.5" r="1" fill="currentColor" opacity=".5" />
                                    </svg>
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/8 focus:border-fuchsia-500/50 focus:bg-white/[0.07] rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors"
                                >
                                    {showPassword ? (
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                            <path d="M1 8C2.5 5 4.8 3.5 7.5 3.5S12.5 5 14 8c-1.5 3-3.8 4.5-6.5 4.5S2.5 11 1 8z" stroke="currentColor" strokeWidth="1.3" />
                                            <circle cx="7.5" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
                                            <path d="M2 2l11 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                                        </svg>
                                    ) : (
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                            <path d="M1 8C2.5 5 4.8 3.5 7.5 3.5S12.5 5 14 8c-1.5 3-3.8 4.5-6.5 4.5S2.5 11 1 8z" stroke="currentColor" strokeWidth="1.3" />
                                            <circle cx="7.5" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember me */}
                        <div className="flex items-center gap-2.5">
                            <div className="relative">
                                <input type="checkbox" id="remember" className="sr-only peer" />
                                <label
                                    htmlFor="remember"
                                    className="w-4 h-4 border border-white/15 rounded-md bg-white/4 peer-checked:bg-fuchsia-600 peer-checked:border-fuchsia-600 items-center justify-center cursor-pointer transition-all duration-150 block"
                                />
                            </div>
                            <label htmlFor="remember" className="text-xs text-white/40 cursor-pointer select-none">
                                Remember me for 30 days
                            </label>
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
                                    Signing in...
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer link */}
                <p className="text-center text-sm text-white/30 mt-6">
                    Don't have an account?{" "}
                    <Link to="/signup">
                        <button
                            onClick={() => onNavigate && onNavigate("signup")}
                            className="text-fuchsia-400 hover:text-fuchsia-300 font-medium transition-colors"
                        >
                            Create one
                        </button>
                    </Link>
                </p>
            </div>
        </div>
    );
}

