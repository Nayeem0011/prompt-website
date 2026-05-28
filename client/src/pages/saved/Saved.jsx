import { useState } from "react";
import { useSaved } from "../../context/useSaved";

const categoryColors = {
  "Portraits": "text-violet-400 bg-violet-500/10",
  "portraits": "text-violet-400 bg-violet-500/10",
  "Ads & Product": "text-amber-400 bg-amber-500/10",
  "ads": "text-amber-400 bg-amber-500/10",
  "Illustration & 3D": "text-teal-400 bg-teal-500/10",
  "illustration": "text-teal-400 bg-teal-500/10",
  "Brand & Logo": "text-blue-400 bg-blue-500/10",
  "brand": "text-blue-400 bg-blue-500/10",
  "Posters & Visuals": "text-pink-400 bg-pink-500/10",
  "posters": "text-pink-400 bg-pink-500/10",
};

const accentBg = {
  "Portraits": "from-violet-500/15 to-fuchsia-500/15",
  "portraits": "from-violet-500/15 to-fuchsia-500/15",
  "Ads & Product": "from-amber-500/15 to-orange-500/15",
  "ads": "from-amber-500/15 to-orange-500/15",
  "Illustration & 3D": "from-teal-500/15 to-emerald-500/15",
  "illustration": "from-teal-500/15 to-emerald-500/15",
  "Brand & Logo": "from-blue-500/15 to-cyan-500/15",
  "brand": "from-blue-500/15 to-cyan-500/15",
  "Posters & Visuals": "from-pink-500/15 to-rose-500/15",
  "posters": "from-pink-500/15 to-rose-500/15",
};

// ── Prompt Detail Drawer
function PromptDrawer({ prompt, onClose, onUnsave }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(prompt.promptText).catch(() => { });
    setCopied(true);
    // TODO: call /api/prompts/:id/copy to track analytics
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#0c0c16] border-l border-white/8 h-full overflow-y-auto flex flex-col">
        {/* Drawer header */}
        <div className={`h-40 bg-linear-to-br ${accentBg[prompt.category] || "from-white/5 to-white/10"} flex items-end p-5 shrink-0 relative`}>
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-black/30 backdrop-blur-sm text-white/60 hover:text-white flex items-center justify-center transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
          <div>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${categoryColors[prompt.category]}`}>{prompt.category}</span>
            <h2 className="text-base font-semibold text-white mt-2">{prompt.title}</h2>
            <p className="text-xs text-white/40 mt-0.5">by @{prompt.author}</p>
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 px-5 py-4 border-b border-white/6">
          <div className="text-center">
            <p className="text-sm font-semibold text-white">{prompt.copies.toLocaleString()}</p>
            <p className="text-[10px] text-white/30">Copies</p>
          </div>
          <div className="w-px h-8 bg-white/[0.07]" />
          <div className="text-center">
            <p className="text-sm font-semibold text-white">⭐ {prompt.rating}</p>
            <p className="text-[10px] text-white/30">Rating</p>
          </div>
          <div className="w-px h-8 bg-white/[0.07]" />
          <div className="flex gap-1 flex-wrap">
            {prompt.tags.map((t) => <span key={t} className="text-[10px] bg-white/6 text-white/40 px-2 py-0.5 rounded-md">{t}</span>)}
          </div>
        </div>

        {/* Description */}
        <div className="px-5 py-4 border-b border-white/6">
          <p className="text-xs font-medium text-white/40 mb-2">Description</p>
          <p className="text-sm text-white/65 leading-relaxed">{prompt.description}</p>
        </div>

        {/* Prompt Text */}
        <div className="px-5 py-4 flex-1">
          <p className="text-xs font-medium text-white/40 mb-2">Prompt Text</p>
          <div className="bg-white/4 border border-white/[0.07] rounded-xl p-4">
            <p className="text-white/70 leading-relaxed font-mono text-xs">{prompt.promptText}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="px-5 py-4 border-t border-white/6 flex gap-3 shrink-0">
          <button onClick={handleCopy} className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${copied ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400" : "bg-linear-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 text-white"}`}>
            {copied ? (
              <><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>Copied!</>
            ) : (
              <><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" /><path d="M2 9V3a1 1 0 011-1h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>Copy Prompt</>
            )}
          </button>
          <button onClick={() => { onUnsave(prompt.id); onClose(); }} className="px-4 py-3 rounded-xl border border-white/8 text-white/40 hover:text-red-400 hover:border-red-500/25 hover:bg-red-500/5 transition-all">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M3 2.5h9a1 1 0 011 1v9l-4.5-2.5L4 12.5V3.5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M5.5 6l4 4M9.5 6l-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page
const Saved = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const [sortBy, setSortBy] = useState("newest");
  const { savedPrompts, removePrompt } = useSaved();

  const saved = savedPrompts;

  // TODO: call /api/saved/:id DELETE
  const handleUnsave = (id) => {
    removePrompt(id);
  };


  const categories = ["All", ...new Set(saved.map((p) => p.category))];

  const filtered = saved
    .filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.author.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.savedAt) - new Date(a.savedAt);
      if (sortBy === "popular") return b.copies - a.copies;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="space-y-6 p-8">
      {selected && <PromptDrawer prompt={selected} onClose={() => setSelected(null)} onUnsave={handleUnsave} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Saved Prompts</h1>
          <p className="text-sm text-white/35 mt-0.5">{saved.length} prompts in your collection</p>
        </div>
      </div>

      {/* Search + Sort */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.3" /><path d="M9 9l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search saved prompts..." className="w-full bg-white/4 border border-white/[0.07] rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-white/20 outline-none focus:border-fuchsia-500/35 transition-all" />
        </div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-white/4 border border-white/[0.07] rounded-xl px-3 py-2 text-sm text-white/60 outline-none focus:border-fuchsia-500/35 transition-all appearance-none pr-8 cursor-pointer">
          <option value="newest" className="bg-[#0f0f18]">Newest saved</option>
          <option value="popular" className="bg-[#0f0f18]">Most popular</option>
          <option value="rating" className="bg-[#0f0f18]">Highest rated</option>
        </select>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className={`shrink-0 px-4 py-2 rounded-xl text-xs font-medium transition-all border ${activeCategory === cat ? "border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-300" : "border-white/[0.07] bg-white/3 text-white/35 hover:text-white/60 hover:bg-white/5"}`}>
            {cat}
            {cat !== "All" && <span className="ml-1.5 text-[10px] opacity-50">{saved.filter((p) => p.category === cat).length}</span>}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-white/3 border border-white/[0.07] rounded-2xl flex items-center justify-center mb-4">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M5 4h18a1 1 0 011 1v18l-9-4.5-9 4.5V5a1 1 0 011-1z" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinejoin="round" /></svg>
          </div>
          <p className="text-sm font-medium text-white/30">No saved prompts yet</p>
          <p className="text-xs text-white/20 mt-1">Browse prompts and save the ones you love</p>
        </div>
      )}

      {/* Grid */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((prompt) => (
            <div key={prompt.id} onClick={() => setSelected(prompt)} className="group bg-white/3 border border-white/[0.07] hover:border-white/13 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5">
              {/* Card top */}
              <div className={`h-28 bg-linear-to-br ${accentBg[prompt.category] || "from-white/5 to-white/10"} relative flex items-center justify-center`}>
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M8 3v10" stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity=".5" /></svg>
                </div>
                {/* Unsave button */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleUnsave(prompt.id); }}
                  className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-black/35 backdrop-blur-sm text-white/50 hover:text-red-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                </button>
                {/* Copy button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard?.writeText(prompt.promptText).catch(() => { });
                    // TODO: call /api/prompts/:id/copy
                  }}
                  className="absolute top-3 left-3 w-7 h-7 rounded-lg bg-black/35 backdrop-blur-sm text-white/50 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="3.5" y="3.5" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.1" /><path d="M1.5 8V2.5a1 1 0 011-1H8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" /></svg>
                </button>
              </div>

              {/* Card body */}
              <div className="p-4">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="text-sm font-medium text-white/85 leading-snug line-clamp-1">{prompt.title}</p>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${categoryColors[prompt.category]}`}>{prompt.category}</span>
                  <span className="text-[10px] text-white/30">@{prompt.author}</span>
                </div>
                <p className="text-xs text-white/40 line-clamp-2 leading-relaxed mb-3">{prompt.description}</p>
                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-white/28">
                  <span>{prompt.copies.toLocaleString()} copies</span>
                  <span>⭐ {prompt.rating}</span>
                  <span>Saved {prompt.savedAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Saved

