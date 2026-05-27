import { useState, useEffect } from "react";

// Mock data (replace with API) 
const mockSummary = {
  totalEarned: 12.847,
  thisMonth: 7.20,
  lastMonth: 5.10,
  pendingPayout: 4.23,
  allTimeCopies: 12847,
  growth: +18.4,
};

const mockMonthly = [
  { month: "Jan", amount: 1.20 }, { month: "Feb", amount: 2.40 }, { month: "Mar", amount: 1.80 },
  { month: "Apr", amount: 3.10 }, { month: "May", amount: 2.70 }, { month: "Jun", amount: 4.20 },
  { month: "Jul", amount: 3.90 }, { month: "Aug", amount: 5.10 }, { month: "Sep", amount: 4.80 },
  { month: "Oct", amount: 6.30 }, { month: "Nov", amount: 5.70 }, { month: "Dec", amount: 7.20 },
];

const mockTransactions = [
  { id: "txn_001", type: "copy", prompt: "Cinematic Portrait Lighting", category: "Portraits", amount: 0.001, date: "2025-05-27", time: "14:32" },
  { id: "txn_002", type: "copy", prompt: "Product Ad Copy Generator", category: "Ads & Product", amount: 0.001, date: "2025-05-27", time: "11:04" },
  { id: "txn_003", type: "payout", prompt: null, category: null, amount: 3.50, date: "2025-05-25", time: "09:00" },
  { id: "txn_004", type: "copy", prompt: "Neon Isometric 3D Scene", category: "Illustration & 3D", amount: 0.001, date: "2025-05-24", time: "18:45" },
  { id: "txn_005", type: "copy", prompt: "Cinematic Portrait Lighting", category: "Portraits", amount: 0.001, date: "2025-05-24", time: "16:20" },
  { id: "txn_006", type: "copy", prompt: "Minimalist Logo Concepts", category: "Brand & Logo", amount: 0.001, date: "2025-05-23", time: "13:11" },
  { id: "txn_007", type: "payout", prompt: null, category: null, amount: 2.80, date: "2025-04-25", time: "09:00" },
  { id: "txn_008", type: "copy", prompt: "Retro Movie Poster", category: "Posters & Visuals", amount: 0.001, date: "2025-04-22", time: "20:30" },
];

const mockTopPrompts = [
  { title: "Cinematic Portrait Lighting", copies: 2841, earnings: 2.841, share: 100 },
  { title: "Product Ad Copy Generator", copies: 1720, earnings: 1.720, share: 60 },
  { title: "Neon Isometric 3D Scene", copies: 980, earnings: 0.980, share: 34 },
  { title: "Minimalist Logo Concepts", copies: 540, earnings: 0.540, share: 19 },
  { title: "Retro Movie Poster", copies: 310, earnings: 0.310, share: 10 },
];

// Bar Chart 
function BarChart({ data }) {
  const max = Math.max(...data.map((d) => d.amount));
  return (
    <div className="flex items-end gap-2 h-36 px-1">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group">
          <div className="w-full relative flex items-end" style={{ height: "110px" }}>
            <div
              className="w-full rounded-t-md transition-all duration-500 relative"
              style={{
                height: `${(d.amount / max) * 100}%`,
                background: i === data.length - 1
                  ? "linear-gradient(180deg, #c026d3, #7c3aed)"
                  : "rgba(255,255,255,0.07)",
                minHeight: "4px",
              }}
            >
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-[#1a1a2e] border border-white/10 rounded-lg px-2 py-1 text-[10px] text-white font-medium pointer-events-none z-10">
                ${d.amount.toFixed(2)}
              </div>
            </div>
          </div>
          <span className="text-[10px] text-white/25">{d.month}</span>
        </div>
      ))}
    </div>
  );
}

// Stat Card
function StatCard({ label, value, sub, subColor = "text-white/35", icon, accent }) {
  return (
    <div className="bg-white/3 border border-white/[0.07] rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-white/35 uppercase tracking-widest">{label}</span>
        <span className={`w-8 h-8 rounded-xl flex items-center justify-center ${accent}`}>{icon}</span>
      </div>
      <p className="text-2xl font-semibold text-white">{value}</p>
      {sub && <p className={`text-xs mt-1 ${subColor}`}>{sub}</p>}
    </div>
  );
}

// Transaction row
function TxnRow({ txn }) {
  const isPayout = txn.type === "payout";
  return (
    <div className="flex items-center gap-4 py-3 border-b border-white/4 last:border-0 hover:bg-white/1 transition-colors px-5">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isPayout ? "bg-fuchsia-500/12 text-fuchsia-400" : "bg-violet-500/12 text-violet-400"}`}>
        {isPayout ? (
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M1.5 5h12v8a1 1 0 01-1 1h-10a1 1 0 01-1-1V5zM1.5 5L3 2.5h9L13.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /><path d="M7.5 7.5v3M6 9h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="4" y="4" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" /><path d="M2.5 10V3a1 1 0 011-1H10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white/80 truncate">
          {isPayout ? "Payout sent to wallet" : `${txn.prompt}`}
        </p>
        <p className="text-xs text-white/28 mt-0.5">
          {isPayout ? "Withdrawal" : txn.category} · {txn.date} at {txn.time}
        </p>
      </div>
      <div className="text-right">
        <p className={`text-sm font-semibold ${isPayout ? "text-emerald-400" : "text-fuchsia-400"}`}>
          {isPayout ? "-" : "+"}${txn.amount.toFixed(3)}
        </p>
        <p className="text-[10px] text-white/25 capitalize">{txn.type}</p>
      </div>
    </div>
  );
}

// Withdraw Modal
function WithdrawModal({ amount, onClose }) {
  const [method, setMethod] = useState("bkash");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handle = async () => {
    if (!number) return;
    setLoading(true);
    // TODO: call /api/payouts/withdraw
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setDone(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#0f0f18] border border-white/10 rounded-2xl w-full max-w-sm p-6">
        {done ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M5 13l5 5 11-11" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <p className="text-base font-semibold text-white mb-1">Withdrawal Requested!</p>
            <p className="text-sm text-white/40 mb-5">Your ${amount.toFixed(2)} will arrive within 24 hours.</p>
            <button onClick={onClose} className="w-full py-2.5 rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 text-sm font-semibold text-white">Done</button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-white">Withdraw Earnings</h3>
              <button onClick={onClose} className="text-white/30 hover:text-white/70 transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div className="bg-fuchsia-500/8 border border-fuchsia-500/15 rounded-xl p-4 mb-5 text-center">
              <p className="text-xs text-white/40 mb-1">Available Balance</p>
              <p className="text-3xl font-semibold text-white">${amount.toFixed(2)}</p>
            </div>
            <div className="flex gap-2 mb-4">
              {[["bkash", "bKash"], ["nagad", "Nagad"], ["paypal", "PayPal"]].map(([id, label]) => (
                <button key={id} onClick={() => setMethod(id)} className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all border ${method === id ? "border-fuchsia-500/50 bg-fuchsia-500/10 text-fuchsia-300" : "border-white/8 text-white/35 hover:text-white/60"}`}>{label}</button>
              ))}
            </div>
            <div className="mb-5">
              <label className="text-xs font-medium text-white/45 mb-1.5 block">
                {method === "paypal" ? "PayPal Email" : "Mobile Number"}
              </label>
              <input value={number} onChange={(e) => setNumber(e.target.value)} placeholder={method === "paypal" ? "you@paypal.com" : "+880 1XXX-XXXXXX"} className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-fuchsia-500/45 transition-all" />
            </div>
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/8 text-sm text-white/50 hover:text-white/80 transition-all">Cancel</button>
              <button onClick={handle} disabled={loading || !number} className="flex-1 py-2.5 rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 disabled:opacity-50 text-sm font-semibold text-white transition-all flex items-center justify-center gap-2">
                {loading ? <><svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="1.5" strokeDasharray="18" strokeDashoffset="10" strokeLinecap="round" /></svg>Processing...</> : "Withdraw Now"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Main Page
export default function Earnings() {
  const [data, setData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [topPrompts, setTopPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [txnFilter, setTxnFilter] = useState("all");
  const [showWithdraw, setShowWithdraw] = useState(false);

  // TODO: replace with real API call
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      // const res = await fetch("/api/earnings", { headers: { Authorization: `Bearer ${token}` } });
      // const json = await res.json();
      // setData(json.summary); setTransactions(json.transactions); setTopPrompts(json.topPrompts);
      await new Promise((r) => setTimeout(r, 500));
      setData(mockSummary);
      setTransactions(mockTransactions);
      setTopPrompts(mockTopPrompts);
      setLoading(false);
    };
    load();
  }, []);

  const filteredTxns = txnFilter === "all" ? transactions : transactions.filter((t) => t.type === txnFilter);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-fuchsia-500/30 border-t-fuchsia-500 rounded-full animate-spin" />
        <p className="text-sm text-white/30">Loading earnings...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 px-8">
      {showWithdraw && <WithdrawModal amount={data.pendingPayout} onClose={() => setShowWithdraw(false)} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Earnings</h1>
          <p className="text-sm text-white/35 mt-0.5">Track your revenue and payouts</p>
        </div>
        <button onClick={() => setShowWithdraw(true)} className="flex items-center gap-2 bg-linear-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1.5 5h11v7a1 1 0 01-1 1h-9a1 1 0 01-1-1V5zM1.5 5L3 2.5h8L12.5 5" stroke="white" strokeWidth="1.3" strokeLinejoin="round" /></svg>
          Withdraw
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Earned" value={`$${data.totalEarned.toFixed(3)}`} sub={`+${data.growth}% this week`} subColor="text-emerald-400" accent="bg-fuchsia-500/15 text-fuchsia-400"
          icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" /><path d="M8 4.5v7M6 5.5C6 4.7 6.9 4 8 4s2 .7 2 1.5S9.1 7 8 7s-2 .7-2 1.5S6.9 10 8 10s2-.7 2-1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>}
        />
        <StatCard label="This Month" value={`$${data.thisMonth.toFixed(2)}`} sub={`vs $${data.lastMonth.toFixed(2)} last month`} accent="bg-violet-500/15 text-violet-400"
          icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3" /><path d="M5 2v2M11 2v2M2 7h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>}
        />
        <StatCard label="Pending Payout" value={`$${data.pendingPayout.toFixed(2)}`} sub="Min. $1.00 to withdraw" accent="bg-amber-500/15 text-amber-400"
          icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 5.5h12v8a1 1 0 01-1 1H3a1 1 0 01-1-1v-8zM2 5.5L3.5 3h9l1.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>}
        />
        <StatCard label="Total Copies" value={data.allTimeCopies.toLocaleString()} sub="All time" accent="bg-blue-500/15 text-blue-400"
          icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" /><path d="M3 11V4a1 1 0 011-1h7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>}
        />
      </div>

      {/* Chart + Top Prompts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="flex flex-col justify-between lg:col-span-3 bg-white/3 border border-white/[0.07] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-sm font-medium text-white">Monthly Earnings</p>
              <p className="text-xs text-white/30 mt-0.5">2025 · ${data.totalEarned.toFixed(2)} total</p>
            </div>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">+{data.growth}% ↑</span>
          </div>
          <BarChart data={mockMonthly} />
        </div>

        <div className="lg:col-span-2 bg-white/3 border border-white/[0.07] rounded-2xl p-5">
          <p className="text-sm font-medium text-white mb-4">Top Earning Prompts</p>
          <div className="space-y-3">
            {topPrompts.map((p, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-white/70 truncate flex-1 pr-3">{p.title}</p>
                  <p className="text-xs font-semibold text-fuchsia-400 shrink-0">${p.earnings.toFixed(3)}</p>
                </div>
                <div className="h-1.5 bg-white/6 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-linear-to-r from-violet-500 to-fuchsia-500 transition-all duration-700" style={{ width: `${p.share}%` }} />
                </div>
                <p className="text-[10px] text-white/25 mt-0.5">{p.copies.toLocaleString()} copies</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white/3 border border-white/[0.07] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
          <p className="text-sm font-medium text-white">Transaction History</p>
          <div className="flex gap-1">
            {["all", "copy", "payout"].map((f) => (
              <button key={f} onClick={() => setTxnFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${txnFilter === f ? "bg-white/9 text-white" : "text-white/30 hover:text-white/60"}`}>{f}</button>
            ))}
          </div>
        </div>
        <div>
          {filteredTxns.map((txn) => <TxnRow key={txn.id} txn={txn} />)}
          {filteredTxns.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-white/20">
              <p className="text-sm">No transactions yet</p>
            </div>
          )}
        </div>
        <div className="px-5 py-3 border-t border-white/5 text-center">
          {/* TODO: implement pagination /api/transactions?page= */}
          <button className="text-xs text-white/30 hover:text-white/60 transition-colors">Load more transactions</button>
        </div>
      </div>

    </div>
  );
}

