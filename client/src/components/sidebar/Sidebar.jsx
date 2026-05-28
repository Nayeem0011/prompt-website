import { useEffect, useCallback } from "react";
import { NavLink, Link, useNavigate, useSearchParams, useLocation } from "react-router-dom";

const categories = [
  {
    id: "all", label: "All",
    icon: (<svg className="w-3 md:w-3.5 lg:w-4 h-3 md:h-3.5 lg:h-4" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /></svg>),
    count: 2840, color: "text-white", accent: "from-violet-500/20 to-fuchsia-500/20", dot: "bg-fuchsia-400",
  },
  {
    id: "ads", label: "Ads & Product",
    icon: (<svg className="w-3 md:w-3.5 lg:w-4 h-3 md:h-3.5 lg:h-4" viewBox="0 0 16 16" fill="none"><path d="M2 5h12v8a1 1 0 01-1 1H3a1 1 0 01-1-1V5z" stroke="currentColor" strokeWidth="1.4" /><path d="M2 5l2-3h8l2 3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M8 8v4M6 10h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>),
    count: 412, color: "text-amber-400", accent: "from-amber-500/10 to-orange-500/10", dot: "bg-amber-400",
  },
  {
    id: "brand", label: "Brand & Logo",
    icon: (<svg className="w-3 md:w-3.5 lg:w-4 h-3 md:h-3.5 lg:h-4" viewBox="0 0 16 16" fill="none"><path d="M8 2l1.8 3.6L14 6.5l-3 2.9.7 4.1L8 11.5l-3.7 1.9.7-4.1-3-2.9 4.2-.9L8 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>),
    count: 289, color: "text-blue-400", accent: "from-blue-500/10 to-cyan-500/10", dot: "bg-blue-400",
  },
  {
    id: "illustration", label: "Illustration & 3D",
    icon: (<svg className="w-3 md:w-3.5 lg:w-4 h-3 md:h-3.5 lg:h-4" viewBox="0 0 16 16" fill="none"><path d="M13 3L9 7M13 3h-3M13 3v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><path d="M3 8c0 2.8 2.2 5 5 5s5-2.2 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><circle cx="5.5" cy="6.5" r="1.5" stroke="currentColor" strokeWidth="1.4" /></svg>),
    count: 537, color: "text-teal-400", accent: "from-teal-500/10 to-emerald-500/10", dot: "bg-teal-400",
  },
  {
    id: "posters", label: "Posters & Visuals",
    icon: (<svg className="w-3 md:w-3.5 lg:w-4 h-3 md:h-3.5 lg:h-4" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M2 10.5l3.5-3.5 2.5 2.5 2-2 3.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="5.5" cy="5.5" r="1" fill="currentColor" /></svg>),
    count: 698, color: "text-pink-400", accent: "from-pink-500/10 to-rose-500/10", dot: "bg-pink-400",
  },
  {
    id: "portraits", label: "Portraits",
    icon: (<svg className="w-3 md:w-3.5 lg:w-4 h-3 md:h-3.5 lg:h-4" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4" /><path d="M3 14c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>),
    count: 904, color: "text-violet-400", accent: "from-violet-500/10 to-purple-500/10", dot: "bg-violet-400",
  },
];

const navItems = [
  {
    id: "dashboard", label: "Dashboard", path: "/dashboard",
    icon: (<svg className="w-3 md:w-3.5 lg:w-4 h-3 md:h-3.5 lg:h-4" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="9" y="1" width="6" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="1" y="10" width="6" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="9" y="7" width="6" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" /></svg>),
  },
  {
    id: "my-prompts", label: "My Prompts", path: "/my-prompts",
    icon: (<svg className="w-3 md:w-3.5 lg:w-4 h-3 md:h-3.5 lg:h-4" viewBox="0 0 16 16" fill="none"><path d="M4 2h8a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4" /><path d="M5.5 5.5h5M5.5 8h5M5.5 10.5h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>),
    badge: "12",
  },
  {
    id: "earnings", label: "Earnings", path: "/earnings",
    icon: (<svg className="w-3 md:w-3.5 lg:w-4 h-3 md:h-3.5 lg:h-4" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" /><path d="M8 5v6M6 6.5C6 5.7 6.9 5 8 5s2 .7 2 1.5S9.1 8 8 8s-2 .7-2 1.5S6.9 11 8 11s2-.7 2-1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>),
  },
  {
    id: "saved", label: "Saved", path: "/saved",
    icon: (<svg className="w-3 md:w-3.5 lg:w-4 h-3 md:h-3.5 lg:h-4" viewBox="0 0 16 16" fill="none"><path d="M3 2h10a1 1 0 011 1v11l-5-2.5L4 14V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>),
    badge: "5",
  },
  {
    id: "profile", label: "Profile", path: "/profile",
    icon: (<svg className="w-3 md:w-3.5 lg:w-4 h-3 md:h-3.5 lg:h-4" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4" /><path d="M3 14c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>),
  },
];

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const activeCategory = searchParams.get("category") || "all";

  // const handleCategoryClick = (catId) => {
  //   const params = new URLSearchParams(searchParams);
  //   if (catId === "all") {
  //     params.delete("category");
  //   } else {
  //     params.set("category", catId);
  //   }
  //   const query = params.toString();
  //   navigate(`${location.pathname}${query ? `?${query}` : ""}`);
  // };

  const handleCategoryClick = (catId) => {
    // যে page-এ আছি সেটা home-related কিনা চেক করো
    const homePaths = ["/", "/featured", "/newest", "/popular"];
    const isHomePage = homePaths.includes(location.pathname);

    if (catId === "all") {
      // home page-এ থাকলে সেখানেই থাকো, নাহলে "/" এ যাও
      navigate(isHomePage ? location.pathname : "/");
    } else {
      // category সহ home page-এ নিয়ে যাও
      navigate(`${isHomePage ? location.pathname : "/"}?category=${catId}`);
    }
  };

  const handleResize = useCallback(() => {
    if (window.innerWidth < 1024) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [setCollapsed]);

  useEffect(() => {
    handleResize();                                    // page load check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // cleanup
  }, [handleResize]);

  return (
    <div>
      <aside
        id="sidebar"
        className={`fixed left-0 top-16 bottom-0 z-40 bg-[#052838] border-r border-white/6 flex flex-col transition-all duration-300 ${collapsed ? "w-10 md:w-12 lg:w-16" : "w-60"}`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-10 w-6 h-6 bg-[#0a0a0f] border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white/80 transition-colors z-10"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}>
            <path d="M6.5 2L3.5 5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex flex-col h-full overflow-hidden">
          {/* Nav Section */}
          <div className="px-3 pt-5 pb-4">
            {!collapsed && (
              <p className="text-[10px] font-semibold text-white/20 uppercase tracking-widest px-2 mb-2">
                Navigation
              </p>
            )}
            <div className="flex flex-col items-center gap-0.5">
              {navItems.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-lg lg:rounded-xl px-4 py-2.5 transition-all duration-200 w-full text-left cursor-pointer ${isActive
                      ? "bg-white/8 text-white"
                      : "text-white/40 hover:text-white/70 hover:bg-white/4"
                    } ${collapsed ? "justify-center px-0" : ""}`
                  }
                  title={collapsed ? item.label : undefined}
                >
                  {({ isActive }) => (
                    <>
                      <span className={`shrink-0 ${isActive ? "text-fuchsia-400" : ""}`}>
                        {item.icon}
                      </span>
                      {!collapsed && (
                        <>
                          <span className="text-sm font-medium flex-1">{item.label}</span>
                          {item.badge && (
                            <span className="text-[10px] font-semibold bg-fuchsia-500/20 text-fuchsia-300 px-1.5 py-0.5 rounded-md">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="mx-2 md:mx-3 lg:mx-4 border-t border-white/6" />

          {/* Categories Section */}
          <div className="px-3 pt-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {!collapsed && (
              <p className="text-[10px] font-semibold text-white/20 uppercase tracking-widest px-2 mb-2">
                Categories
              </p>
            )}
            <div className="flex flex-col items-center gap-0.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`group flex items-center gap-3 rounded-lg lg:rounded-xl px-4 py-2.5 transition-all duration-200 w-full text-left relative overflow-hidden cursor-pointer border ${activeCategory === cat.id
                    ? `bg-linear-to-r ${cat.accent} border-white/8`
                    : "hover:bg-white/4 border-transparent"
                    } ${collapsed ? "justify-center px-0" : ""}`}
                  title={collapsed ? cat.label : undefined}
                >
                  <span className={`shrink-0 transition-colors duration-200 ${activeCategory === cat.id ? cat.color : "text-white/30 group-hover:text-white/50"
                    }`}>
                    {cat.icon}
                  </span>
                  {!collapsed && (
                    <>
                      <span className={`text-sm font-medium flex-1 transition-colors duration-200 ${activeCategory === cat.id ? "text-white" : "text-white/40 group-hover:text-white/70"
                        }`}>
                        {cat.label}
                      </span>
                      <span className={`text-[10px] font-medium transition-colors duration-200 ${activeCategory === cat.id ? "text-white/50" : "text-white/20"
                        }`}>
                        {cat.count.toLocaleString()}
                      </span>
                    </>
                  )}
                  {collapsed && activeCategory === cat.id && (
                    <span className={`absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-4 ${cat.dot} rounded-l`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="mx-2 md:mx-3 lg:mx-4 border-t border-white/6" />

          {/* Bottom: Sell CTA */}
          {!collapsed && (
            <div className="p-2 sm:p-3 md:p-3.5 lg:p-4">
              <div className="bg-linear-to-br from-violet-600/20 to-fuchsia-600/20 border border-white/8 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 bg-linear-to-br from-violet-500 to-fuchsia-600 rounded-lg flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1v10M2 5l4-4 4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm font-semibold text-white">Start Selling</span>
                </div>
                <p className="text-xs text-white/40 leading-relaxed mb-3">
                  Earn $0.001 per prompt sold. Upload once, earn forever.
                </p>
                <Link to="/sell-prompt">
                  <button className="w-full bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 rounded-xl py-2 text-xs font-semibold text-white transition-all duration-200 cursor-pointer">
                    Upload Prompts
                  </button>
                </Link>
              </div>
            </div>
          )}

          {/* Bottom links */}
          <div className="pb-2 sm:pb-2.5 md:pb-3 lg:pb-4 flex flex-col gap-0.5">
            <button className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-white/30 hover:text-white/60 hover:bg-white/4 transition-all duration-200 w-full text-left ${collapsed ? "justify-center px-0" : ""}`}>
              <svg className="w-3 md:w-3.5 lg:w-4 h-3 md:h-3.5 lg:h-4" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L10 5h4l-3.5 2.5 1.3 4L8 9l-3.8 2.5 1.3-4L2 5h4L8 1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
              {!collapsed && <span className="text-sm font-medium">Admin Panel</span>}
            </button>
            <button className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-white/30 hover:text-white/60 hover:bg-white/4 transition-all duration-200 w-full text-left ${collapsed ? "justify-center px-0" : ""}`}>
              <svg className="w-3 md:w-3.5 lg:w-4 h-3 md:h-3.5 lg:h-4" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M8 1v2M8 13v2M1 8h2M13 8h2M2.9 2.9l1.4 1.4M11.7 11.7l1.4 1.4M2.9 13.1l1.4-1.4M11.7 4.3l1.4-1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              {!collapsed && <span className="text-sm font-medium">Settings</span>}
            </button>
          </div>

        </div>
      </aside>
    </div>
  );
};

export default Sidebar;

