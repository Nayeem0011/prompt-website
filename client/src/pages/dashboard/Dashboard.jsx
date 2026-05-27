import { useState, useEffect } from "react";

// ─── Mock data (replace with real API calls) ──────────────────────────────────
const mockStats = {
  totalEarnings: 12.847,
  totalPrompts: 34,
  totalCopies: 12847,
  pendingPayout: 4.23,
  monthlyEarnings: [1.2, 2.4, 1.8, 3.1, 2.7, 4.2, 3.9, 5.1, 4.8, 6.3, 5.7, 7.2],
  weeklyGrowth: +18.4,
};

const mockPrompts = [
  { id: 1, title: "Cinematic Portrait Lighting", category: "Portraits", copies: 2841, earnings: 2.841, status: "active", rating: 4.9, createdAt: "2025-04-10" },
  { id: 2, title: "Product Ad Copy Generator", category: "Ads & Product", copies: 1720, earnings: 1.72, status: "active", rating: 4.7, createdAt: "2025-03-22" },
  { id: 3, title: "Neon Isometric 3D Scene", category: "Illustration & 3D", copies: 980, earnings: 0.98, status: "active", rating: 4.8, createdAt: "2025-03-05" },
  { id: 4, title: "Minimalist Logo Concepts", category: "Brand & Logo", copies: 540, earnings: 0.54, status: "paused", rating: 4.6, createdAt: "2025-02-18" },
  { id: 5, title: "Retro Movie Poster", category: "Posters & Visuals", copies: 310, earnings: 0.31, status: "active", rating: 4.5, createdAt: "2025-02-01" },
];

const mockRecentActivity = [
  { id: 1, type: "copy", prompt: "Cinematic Portrait Lighting", time: "2 min ago", amount: 0.001 },
  { id: 2, type: "copy", prompt: "Product Ad Copy Generator", time: "14 min ago", amount: 0.001 },
  { id: 3, type: "payout", prompt: null, time: "2 hours ago", amount: 3.50 },
  { id: 4, type: "copy", prompt: "Neon Isometric 3D Scene", time: "3 hours ago", amount: 0.001 },
  { id: 5, type: "copy", prompt: "Cinematic Portrait Lighting", time: "5 hours ago", amount: 0.001 },
];

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon, accent }) {
  return (
    <div className="bg-white/3 border border-white/[0.07] rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium text-white/40 uppercase tracking-widest">{label}</span>
        <span className={`w-8 h-8 rounded-xl flex items-center justify-center ${accent}`}>
          {icon}
        </span>
      </div>
      <div>
        <p className="text-2xl font-semibold text-white">{value}</p>
        {sub && <p className="text-xs text-white/35 mt-1">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Mini Bar Chart ───────────────────────────────────────────────────────────
function MiniChart({ data }) {
  const max = Math.max(...data);
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  return (
    <div className="flex items-end gap-1 h-20">
      {data.map((val, i) => (
        <div key={i} className="flex flex-col items-center gap-1 flex-1">
          <div
            className="w-full rounded-sm transition-all duration-500"
            style={{
              height: `${(val / max) * 70}px`,
              background: i === data.length - 1
                ? "linear-gradient(180deg, #c026d3, #7c3aed)"
                : "rgba(255,255,255,0.08)",
            }}
          />
          <span className="text-[9px] text-white/20">{months[i]}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  return status === "active" ? (
    <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
      Active
    </span>
  ) : (
    <span className="flex items-center gap-1.5 text-xs font-medium text-white/30 bg-white/5 px-2.5 py-1 rounded-lg">
      <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
      Paused
    </span>
  );
}

// ─── Activity Icon ────────────────────────────────────────────────────────────
function ActivityIcon({ type }) {
  if (type === "copy") return (
    <span className="w-8 h-8 rounded-xl bg-violet-500/15 flex items-center justify-center text-violet-400">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M2 9V3a1 1 0 011-1h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    </span>
  );
  return (
    <span className="w-8 h-8 rounded-xl bg-fuchsia-500/15 flex items-center justify-center text-fuchsia-400">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M7 4.5v3l2 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    </span>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [prompts, setPrompts] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  // TODO: Replace this with real API calls
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Example: const res = await fetch("/api/dashboard", { headers: { Authorization: `Bearer ${token}` } });
        // const data = await res.json();
        // setStats(data.stats);
        // setPrompts(data.prompts);
        // setActivity(data.activity);

        // Using mock data for now:
        await new Promise((r) => setTimeout(r, 600));
        setStats(mockStats);
        setPrompts(mockPrompts);
        setActivity(mockRecentActivity);
      } catch (err) {
        console.error("Failed to load dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const filteredPrompts = activeFilter === "all"
    ? prompts
    : prompts.filter((p) => p.status === activeFilter);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-fuchsia-500/30 border-t-fuchsia-500 rounded-full animate-spin" />
        <p className="text-sm text-white/30">Loading dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 p-8">

      {/* ── Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Dashboard</h1>
          <p className="text-sm text-white/35 mt-0.5">Your earnings & prompt performance</p>
        </div>
        <button className="flex items-center gap-2 bg-linear-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M2 7h10" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          Add Prompt
        </button>
      </div>

      {/* ── Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Earnings"
          value={`$${stats.totalEarnings.toFixed(3)}`}
          sub={`+${stats.weeklyGrowth}% this week`}
          accent="bg-fuchsia-500/15 text-fuchsia-400"
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M8 4.5v7M6 5.5C6 4.7 6.9 4 8 4s2 .7 2 1.5S9.1 7 8 7s-2 .7-2 1.5S6.9 10 8 10s2-.7 2-1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          }
        />
        <StatCard
          label="Total Prompts"
          value={stats.totalPrompts}
          sub="Across all categories"
          accent="bg-violet-500/15 text-violet-400"
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" />
              <path d="M5 5.5h6M5 8h6M5 10.5h3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          }
        />
        <StatCard
          label="Total Copies"
          value={stats.totalCopies.toLocaleString()}
          sub="All time"
          accent="bg-blue-500/15 text-blue-400"
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M3 11V4a1 1 0 011-1h7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          }
        />
        <StatCard
          label="Pending Payout"
          value={`$${stats.pendingPayout.toFixed(2)}`}
          sub="Available to withdraw"
          accent="bg-amber-500/15 text-amber-400"
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 5h12v8a1 1 0 01-1 1H3a1 1 0 01-1-1V5zM2 5l2-3h8l2 3" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
              <path d="M8 8v3M6.5 9.5h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          }
        />
      </div>

      {/* ── Chart + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

        {/* Earnings Chart */}
        <div className="flex flex-col justify-between lg:col-span-3 bg-white/3 border border-white/[0.07] rounded-2xl p-5">
          <div className="flex items-center justify-between ">
            <div>
              <p className="text-sm font-medium text-white">Monthly Earnings</p>
              <p className="text-xs text-white/35 mt-0.5">2025 overview</p>
            </div>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
              +{stats.weeklyGrowth}% ↑
            </span>
          </div>
          <MiniChart data={stats.monthlyEarnings} />
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white/3 border border-white/[0.07] rounded-2xl p-5">
          <p className="text-sm font-medium text-white mb-4">Recent Activity</p>
          <div className="space-y-3">
            {activity.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <ActivityIcon type={item.type} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white/80 truncate">
                    {item.type === "copy" ? item.prompt : "Payout received"}
                  </p>
                  <p className="text-[11px] text-white/30">{item.time}</p>
                </div>
                <span className={`text-xs font-semibold ${item.type === "payout" ? "text-emerald-400" : "text-white/50"}`}>
                  +${item.amount.toFixed(3)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Prompts Table */}
      <div className="bg-white/3 border border-white/[0.07] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-white/6">
          <p className="text-sm font-medium text-white">My Prompts</p>
          <div className="flex items-center gap-2">
            {["all", "active", "paused"].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all duration-150 ${activeFilter === f
                    ? "bg-white/10 text-white"
                    : "text-white/35 hover:text-white/60"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {["Prompt", "Category", "Copies", "Earnings", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left text-[11px] font-medium text-white/25 uppercase tracking-wider px-5 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredPrompts.map((prompt, i) => (
                <tr
                  key={prompt.id}
                  className="border-b border-white/4 hover:bg-white/2 transition-colors"
                >
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-white/85">{prompt.title}</p>
                    <p className="text-xs text-white/30 mt-0.5">{prompt.createdAt}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-white/45 bg-white/5 px-2 py-1 rounded-lg">
                      {prompt.category}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm text-white/75">{prompt.copies.toLocaleString()}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-fuchsia-400">${prompt.earnings.toFixed(3)}</p>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={prompt.status} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {/* TODO: wire up edit/delete handlers */}
                      <button className="p-1.5 rounded-lg hover:bg-white/[0.07] text-white/30 hover:text-white/70 transition-all">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M9 2l2 2-7 7H2V9L9 2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-all">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M2 3.5h9M5 3.5V2.5h3v1M3.5 3.5l.5 7h5l.5-7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPrompts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-white/20">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="4" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10 11h12M10 16h8M10 21h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p className="text-sm mt-3">No prompts found</p>
          </div>
        )}
      </div>

      {/* ── Withdraw Section */}
      <div className="bg-linear-to-r from-violet-600/10 to-fuchsia-600/10 border border-white/[0.07] rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-white">Ready to withdraw?</p>
          <p className="text-xs text-white/40 mt-1">
            You have <span className="text-fuchsia-400 font-medium">${stats.pendingPayout.toFixed(2)}</span> pending. Minimum payout is $1.00.
          </p>
        </div>
        {/* TODO: wire up withdrawal API */}
        <button className="flex items-center gap-2 bg-linear-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 5h10v7a1 1 0 01-1 1H3a1 1 0 01-1-1V5zM2 5l1.5-3h7L12 5" stroke="white" strokeWidth="1.3" strokeLinejoin="round" />
            <path d="M7 7v3M5.5 8.5h3" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          Withdraw
        </button>
      </div>

    </div>
  );
}
