import { useState, useEffect } from "react";

// Mock data (replace with API)
const mockPrompts = [
  { id: 1, title: "Cinematic Portrait Lighting", category: "Portraits", copies: 2841, earnings: 2.841, status: "active", rating: 4.9, tags: ["Midjourney", "Portrait"], createdAt: "2025-04-10", description: "A powerful prompt for generating cinematic, dramatic portrait lighting with deep shadows and warm key light." },
  { id: 2, title: "Product Ad Copy Generator", category: "Ads & Product", copies: 1720, earnings: 1.720, status: "active", rating: 4.7, tags: ["GPT-4", "Marketing"], createdAt: "2025-03-22", description: "Generate high-converting product ad copy for any niche. Includes headlines, body text, and CTA." },
  { id: 3, title: "Neon Isometric 3D Scene", category: "Illustration & 3D", copies: 980, earnings: 0.980, status: "active", rating: 4.8, tags: ["Midjourney", "3D"], createdAt: "2025-03-05", description: "Create stunning neon-lit isometric 3D environments with perfect perspective and depth." },
  { id: 4, title: "Minimalist Logo Concepts", category: "Brand & Logo", copies: 540, earnings: 0.540, status: "paused", rating: 4.6, tags: ["DALL-E", "Branding"], createdAt: "2025-02-18", description: "Generate clean, timeless minimalist logo concepts for modern brands." },
  { id: 5, title: "Retro Movie Poster", category: "Posters & Visuals", copies: 310, earnings: 0.310, status: "active", rating: 4.5, tags: ["Stable Diffusion"], createdAt: "2025-02-01", description: "Create vintage-style movie posters with retro typography and color grading." },
  { id: 6, title: "Anime Character Sheet", category: "Portraits", copies: 210, earnings: 0.210, status: "draft", rating: 0, tags: ["Midjourney", "Anime"], createdAt: "2025-01-20", description: "Full character reference sheet in anime style with multiple poses and expressions." },
];

const categoryColors = {
  "Portraits": "text-violet-400 bg-violet-500/10",
  "Ads & Product": "text-amber-400 bg-amber-500/10",
  "Illustration & 3D": "text-teal-400 bg-teal-500/10",
  "Brand & Logo": "text-blue-400 bg-blue-500/10",
  "Posters & Visuals": "text-pink-400 bg-pink-500/10",
};

const accentColors = {
  "Portraits": "from-violet-500/20 to-fuchsia-500/20",
  "Ads & Product": "from-amber-500/20 to-orange-500/20",
  "Illustration & 3D": "from-teal-500/20 to-emerald-500/20",
  "Brand & Logo": "from-blue-500/20 to-cyan-500/20",
  "Posters & Visuals": "from-pink-500/20 to-rose-500/20",
};

// Add/Edit Modal
function PromptModal({ prompt, onClose, onSave }) {
  const [form, setForm] = useState(
    prompt || { title: "", category: "Portraits", description: "", tags: "", status: "active" }
  );
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#0f0f18] border border-white/10 rounded-2xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-semibold text-white">{prompt ? "Edit Prompt" : "Add New Prompt"}</h3>
          <button onClick={onClose} className="text-white/30 hover:text-white/70 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-white/45 mb-1.5 block">Title</label>
            <input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Prompt title..." className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-fuchsia-500/45 transition-all" />
          </div>
          <div>
            <label className="text-xs font-medium text-white/45 mb-1.5 block">Category</label>
            <select value={form.category} onChange={(e) => update("category", e.target.value)} className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-fuchsia-500/45 transition-all appearance-none">
              {["Portraits", "Ads & Product", "Illustration & 3D", "Brand & Logo", "Posters & Visuals"].map((c) => (
                <option key={c} value={c} className="bg-[#0f0f18]">{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-white/45 mb-1.5 block">Description</label>
            <textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={3} placeholder="Describe what this prompt does..." className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-fuchsia-500/45 transition-all resize-none" />
          </div>
          <div>
            <label className="text-xs font-medium text-white/45 mb-1.5 block">Tags (comma separated)</label>
            <input value={Array.isArray(form.tags) ? form.tags.join(", ") : form.tags} onChange={(e) => update("tags", e.target.value)} placeholder="Midjourney, Portrait, Cinematic" className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-fuchsia-500/45 transition-all" />
          </div>
          <div>
            <label className="text-xs font-medium text-white/45 mb-1.5 block">Status</label>
            <div className="flex gap-2">
              {["active", "paused", "draft"].map((s) => (
                <button key={s} onClick={() => update("status", s)} className={`px-4 py-2 rounded-xl text-xs font-medium capitalize transition-all border ${form.status === s ? "border-fuchsia-500/50 bg-fuchsia-500/10 text-fuchsia-300" : "border-white/8 text-white/35 hover:text-white/60"}`}>{s}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/8 text-sm font-medium text-white/50 hover:text-white/80 transition-all">Cancel</button>
          {/* TODO: call /api/prompts POST or PUT */}
          <button onClick={() => { onSave(form); onClose(); }} className="flex-1 py-2.5 rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 text-sm font-semibold text-white hover:opacity-90 transition-all">
            {prompt ? "Save Changes" : "Publish Prompt"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Status Badge
function StatusBadge({ status }) {
  const map = {
    active: "text-emerald-400 bg-emerald-500/10",
    paused: "text-white/30 bg-white/5",
    draft: "text-amber-400 bg-amber-500/10",
  };
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md capitalize ${map[status]}`}>
      {status}
    </span>
  );
}

// Main Page
export default function MyPromptsPage() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("grid"); // "grid" | "list"
  const [modal, setModal] = useState(null); // null | "add" | prompt obj
  const [deleteId, setDeleteId] = useState(null);

  // TODO: replace with real API call
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      // const res = await fetch("/api/my-prompts", { headers: { Authorization: `Bearer ${token}` } });
      // const data = await res.json();
      // setPrompts(data.prompts);
      await new Promise((r) => setTimeout(r, 500));
      setPrompts(mockPrompts);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = prompts.filter((p) => {
    const matchFilter = filter === "all" || p.status === filter;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  // TODO: call /api/prompts/:id DELETE
  const handleDelete = (id) => { setPrompts((prev) => prev.filter((p) => p.id !== id)); setDeleteId(null); };

  // TODO: call /api/prompts POST or PUT
  const handleSave = (form) => {
    if (modal?.id) {
      setPrompts((prev) => prev.map((p) => p.id === modal.id ? { ...p, ...form } : p));
    } else {
      setPrompts((prev) => [...prev, { ...form, id: Date.now(), copies: 0, earnings: 0, rating: 0, createdAt: new Date().toISOString().split("T")[0] }]);
    }
  };

  const counts = { all: prompts.length, active: prompts.filter((p) => p.status === "active").length, paused: prompts.filter((p) => p.status === "paused").length, draft: prompts.filter((p) => p.status === "draft").length };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-fuchsia-500/30 border-t-fuchsia-500 rounded-full animate-spin" />
        <p className="text-sm text-white/30">Loading prompts...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 p-8">
      {modal !== null && (
        <PromptModal prompt={typeof modal === "object" && modal?.id ? modal : null} onClose={() => setModal(null)} onSave={handleSave} />
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0f0f18] border border-white/10 rounded-2xl p-6 max-w-sm w-full text-center">
            <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 6h16M8 6V4h6v2M5 6l1 13h10l1-13" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <p className="text-base font-semibold text-white mb-1">Delete Prompt?</p>
            <p className="text-sm text-white/40 mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-white/8 text-sm text-white/50 hover:text-white/80 transition-all">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-sm font-medium text-red-400 hover:bg-red-500/30 transition-all">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">My Prompts</h1>
          <p className="text-sm text-white/35 mt-0.5">{prompts.length} prompts total</p>
        </div>
        <button onClick={() => setModal("add")} className="flex items-center gap-2 bg-linear-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M2 7h10" stroke="white" strokeWidth="1.8" strokeLinecap="round" /></svg>
          Add Prompt
        </button>
      </div>

      {/* Filters + Search + View toggle */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-1 bg-white/3 border border-white/[0.07] rounded-xl p-1">
          {Object.entries(counts).map(([key, count]) => (
            <button key={key} onClick={() => setFilter(key)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all flex items-center gap-1.5 ${filter === key ? "bg-white/9 text-white" : "text-white/35 hover:text-white/60"}`}>
              {key}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${filter === key ? "bg-white/10 text-white/70" : "bg-white/5 text-white/25"}`}>{count}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 relative min-w-48">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.3" /><path d="M9 9l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search prompts..." className="w-full bg-white/4 border border-white/[0.07] rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-white/20 outline-none focus:border-fuchsia-500/35 transition-all" />
        </div>

        <div className="flex gap-1 bg-white/3 border border-white/[0.07] rounded-xl p-1">
          {[["grid", <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1" y="1" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2" /><rect x="7.5" y="1" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2" /><rect x="1" y="7.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2" /><rect x="7.5" y="7.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2" /></svg>], ["list", <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.5 3.5h10M1.5 6.5h10M1.5 9.5h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>]].map(([v, icon]) => (
            <button key={v} onClick={() => setView(v)} className={`p-1.5 rounded-lg transition-all ${view === v ? "bg-white/9 text-white" : "text-white/30 hover:text-white/60"}`}>{icon}</button>
          ))}
        </div>
      </div>

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((prompt) => (
            <div key={prompt.id} className="group bg-white/3 border border-white/[0.07] hover:border-white/12 rounded-2xl overflow-hidden transition-all duration-200">
              {/* Card visual */}
              <div className={`h-32 bg-linear-to-br ${accentColors[prompt.category] || "from-white/5 to-white/10"} relative flex items-center justify-center`}>
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 9h10M9 4v10" stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity=".5" /></svg>
                </div>
                <div className="absolute top-3 left-3"><StatusBadge status={prompt.status} /></div>
                <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setModal(prompt)} className="w-7 h-7 rounded-lg bg-black/40 backdrop-blur-sm text-white/70 hover:text-white flex items-center justify-center transition-colors">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M7.5 1.5l2 2-6 6H1.5V7.5l6-6z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" /></svg>
                  </button>
                  <button onClick={() => setDeleteId(prompt.id)} className="w-7 h-7 rounded-lg bg-black/40 backdrop-blur-sm text-white/40 hover:text-red-400 flex items-center justify-center transition-colors">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1.5 2.5h8M4 2.5V1.5h3v1M3 2.5l.5 7h4l.5-7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>
              </div>
              {/* Card body */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-medium text-white/85 leading-snug">{prompt.title}</p>
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${categoryColors[prompt.category]}`}>{prompt.category}</span>
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/5 text-xs text-white/30">
                  <span>{prompt.copies.toLocaleString()} copies</span>
                  <span className="text-fuchsia-400 font-medium">${prompt.earnings.toFixed(3)}</span>
                  {prompt.rating > 0 && <span className="ml-auto">⭐ {prompt.rating}</span>}
                </div>
              </div>
            </div>
          ))}

          {/* Empty add card */}
          <button onClick={() => setModal("add")} className="border border-dashed border-white/10 hover:border-fuchsia-500/30 rounded-2xl h-52 flex flex-col items-center justify-center gap-3 text-white/20 hover:text-fuchsia-400 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-white/3 group-hover:bg-fuchsia-500/10 border border-white/[0.07] group-hover:border-fuchsia-500/30 flex items-center justify-center transition-all">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 4v10M4 9h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            </div>
            <span className="text-sm font-medium">Add New Prompt</span>
          </button>
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <div className="bg-white/3 border border-white/[0.07] rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {["Prompt", "Category", "Tags", "Copies", "Earnings", "Status", ""].map((h) => (
                  <th key={h} className="text-left text-[10px] font-semibold text-white/22 uppercase tracking-wider px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-white/4 hover:bg-white/2 transition-colors">
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-white/85">{p.title}</p>
                    <p className="text-xs text-white/25 mt-0.5">{p.createdAt}</p>
                  </td>
                  <td className="px-5 py-4"><span className={`text-xs font-medium px-2 py-0.5 rounded-md ${categoryColors[p.category]}`}>{p.category}</span></td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1 flex-wrap">{p.tags.map((t) => <span key={t} className="text-[10px] bg-white/5 text-white/35 px-2 py-0.5 rounded-md">{t}</span>)}</div>
                  </td>
                  <td className="px-5 py-4 text-sm text-white/60">{p.copies.toLocaleString()}</td>
                  <td className="px-5 py-4 text-sm font-medium text-fuchsia-400">${p.earnings.toFixed(3)}</td>
                  <td className="px-5 py-4"><StatusBadge status={p.status} /></td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1">
                      <button onClick={() => setModal(p)} className="p-1.5 rounded-lg hover:bg-white/[0.07] text-white/25 hover:text-white/65 transition-all">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M9 2l2 2-7 7H2V9L9 2z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" /></svg>
                      </button>
                      <button onClick={() => setDeleteId(p.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/25 hover:text-red-400 transition-all">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 3.5h9M5 3.5V2.5h3v1M3.5 3.5l.5 7h5l.5-7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-14 text-white/20">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="4" y="4" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.3" /><path d="M9 10h10M9 14h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
              <p className="text-sm mt-3">No prompts found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

