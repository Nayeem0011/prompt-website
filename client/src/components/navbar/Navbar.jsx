import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const location = useLocation();

  const currentPath = location.pathname.replace("/", "") || "home";

  const navLinks = [
    { id: "featured", label: "Featured", path: "/featured" },
    { id: "newest", label: "Newest", path: "/newest" },
    { id: "popular", label: "Popular", path: "/popular" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#052838] border-b border-white/6">
      <div className="flex items-center justify-between px-6 h-16 max-w-screen-2xl mx-auto">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 min-w-45">
          <div className="relative w-8 h-8 shrink-0">
            <div className="absolute inset-0 bg-linear-to-br from-violet-500 to-fuchsia-600 rounded-lg" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 9h10M9 4v10" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                <circle cx="9" cy="9" r="3" stroke="white" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
          <span className="text-white font-semibold text-[17px] tracking-tight">
            Prompt<span className="text-fuchsia-400">Hub</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          <Link to="/">
            <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${currentPath === "home" || location.pathname === "/"
                ? "bg-white/10 text-white"
                : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}>
              Home
            </button>
          </Link>
          {navLinks.map((link) => (
            <Link key={link.id} to={link.path}>
              <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${location.pathname === link.path
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
                }`}>
                {link.label}
              </button>
            </Link>
          ))}
        </div>

        {/* Search Bar */}
        <div className={`relative flex items-center transition-all duration-300 ${searchFocused ? "w-72" : "w-52"}`}>
          <div className={`absolute left-3 transition-colors duration-200 ${searchFocused ? "text-fuchsia-400" : "text-white/30"}`}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search prompts..."
            className="w-full bg-white/6 border border-white/8 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-white/25 outline-none focus:border-fuchsia-500/40 focus:bg-white/8 transition-all duration-200"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 text-white/30 hover:text-white/60 transition-colors cursor-pointer">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1 1l11 11M12 1L1 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 min-w-45 justify-end">
          <button className="text-white/40 hover:text-white/70 transition-colors p-2 rounded-lg hover:bg-white/5 cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2a7 7 0 100 14A7 7 0 009 2z" stroke="currentColor" strokeWidth="1.4" />
              <path d="M9 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
          <button className="text-white/40 hover:text-white/70 transition-colors p-2 rounded-lg hover:bg-white/5 relative cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M14 10.5V7a5 5 0 00-10 0v3.5L2.5 13h13L14 10.5z" stroke="currentColor" strokeWidth="1.4" />
              <path d="M7 13a2 2 0 004 0" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-fuchsia-500 rounded-full" />
          </button>
          <Link to="/login">
            <button className="flex items-center gap-2 bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all duration-200 shadow-lg shadow-fuchsia-900/30 cursor-pointer">
              Login
            </button>
          </Link>
          <Link to="/sell-prompt">
            <button className="flex items-center gap-2 bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all duration-200 shadow-lg shadow-fuchsia-900/30 cursor-pointer">
              Sell Prompts
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden flex items-center gap-1 px-4 pb-3 overflow-x-auto scrollbar-hide">
        {navLinks.map((link) => (
          <Link key={link.id} to={link.path}>
            <button className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${location.pathname === link.path ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"
              }`}>
              {link.label}
            </button>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;