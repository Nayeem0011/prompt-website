import { useState } from "react";

// Constants
const CATEGORIES = [
    { id: "portraits", label: "Portraits", icon: "👤", color: "from-violet-500/20 to-fuchsia-500/20", border: "border-violet-500/30", text: "text-violet-300" },
    { id: "ads", label: "Ads & Product", icon: "📦", color: "from-amber-500/20 to-orange-500/20", border: "border-amber-500/30", text: "text-amber-300" },
    { id: "brand", label: "Brand & Logo", icon: "⭐", color: "from-blue-500/20 to-cyan-500/20", border: "border-blue-500/30", text: "text-blue-300" },
    { id: "illustration", label: "Illustration & 3D", icon: "🎨", color: "from-teal-500/20 to-emerald-500/20", border: "border-teal-500/30", text: "text-teal-300" },
    { id: "posters", label: "Posters & Visuals", icon: "🖼️", color: "from-pink-500/20 to-rose-500/20", border: "border-pink-500/30", text: "text-pink-300" },
];

const AI_TOOLS = ["Midjourney", "DALL-E 3", "Stable Diffusion", "GPT-4", "Claude", "Gemini", "Sora", "Runway"];

const STEPS = [
    { id: 1, label: "Basic Info" },
    { id: 2, label: "Prompt" },
    { id: 3, label: "Details" },
    { id: 4, label: "Preview" },
];

// Components
function StepIndicator({ currentStep }) {
    return (
        <div className="flex items-center gap-0 mb-8">
            {STEPS.map((step, i) => (
                <div key={step.id} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border transition-all duration-300 ${currentStep === step.id
                            ? "bg-linear-to-br from-violet-600 to-fuchsia-600 border-transparent text-white shadow-lg shadow-fuchsia-900/30"
                            : currentStep > step.id
                                ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                                : "bg-white/4 border-white/10 text-white/25"
                            }`}>
                            {currentStep > step.id ? (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            ) : step.id}
                        </div>
                        <span className={`text-[10px] font-medium mt-1.5 whitespace-nowrap ${currentStep === step.id ? "text-fuchsia-300" : currentStep > step.id ? "text-emerald-400" : "text-white/25"}`}>
                            {step.label}
                        </span>
                    </div>
                    {i < STEPS.length - 1 && (
                        <div className={`flex-1 h-px mx-3 mb-4 transition-all duration-300 ${currentStep > step.id ? "bg-emerald-500/40" : "bg-white/[0.07]"}`} />
                    )}
                </div>
            ))}
        </div>
    );
}

function Label({ children, required }) {
    return (
        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
            {children} {required && <span className="text-fuchsia-500 normal-case tracking-normal">*</span>}
        </label>
    );
}

function Input({ value, onChange, placeholder, maxLength, type = "text" }) {
    return (
        <div className="relative">
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                maxLength={maxLength}
                className="w-full bg-white/4 border border-white/8 hover:border-white/[0.14] focus:border-fuchsia-500/50 focus:bg-white/6 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200"
            />
            {maxLength && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-white/20">
                    {value.length}/{maxLength}
                </span>
            )}
        </div>
    );
}

// Step 1: Basic Info
function Step1({ form, update }) {
    return (
        <div className="space-y-6">
            <div>
                <Label required>Prompt Title</Label>
                <Input
                    value={form.title}
                    onChange={(v) => update("title", v)}
                    placeholder="e.g. Cinematic Portrait with Dramatic Lighting"
                    maxLength={80}
                />
                <p className="text-xs text-white/25 mt-1.5">Clear, descriptive titles get 3x more copies</p>
            </div>

            <div>
                <Label required>Category</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            type="button"
                            onClick={() => update("category", cat.id)}
                            className={`group flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 text-left ${form.category === cat.id
                                ? `bg-linear-to-br ${cat.color} ${cat.border}`
                                : "bg-white/3 border-white/[0.07] hover:bg-white/6 hover:border-white/12"
                                }`}
                        >
                            <span className="text-xl leading-none">{cat.icon}</span>
                            <span className={`text-xs font-medium leading-tight ${form.category === cat.id ? cat.text : "text-white/45"}`}>
                                {cat.label}
                            </span>
                            {form.category === cat.id && (
                                <div className="ml-auto w-4 h-4 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shrink-0">
                                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l1.5 1.5 3.5-3.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <Label required>Short Description</Label>
                <textarea
                    value={form.description}
                    onChange={(e) => update("description", e.target.value)}
                    placeholder="What does this prompt do? What makes it special? Who is it for?"
                    rows={3}
                    maxLength={200}
                    className="w-full bg-white/4 border border-white/8 hover:border-white/[0.14] focus:border-fuchsia-500/50 focus:bg-white/6 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none resize-none transition-all duration-200"
                />
                <div className="flex items-center justify-between mt-1.5">
                    <p className="text-xs text-white/25">Shown on the prompt card</p>
                    <span className="text-[10px] text-white/20">{form.description.length}/200</span>
                </div>
            </div>
        </div>
    );
}

// Step 2: Prompt Text
function Step2({ form, update }) {
    const [charCount, setCharCount] = useState(form.promptText.length);

    const handleChange = (val) => {
        update("promptText", val);
        setCharCount(val.length);
    };

    return (
        <div className="space-y-6">
            {/* Tip box */}
            <div className="flex gap-3 bg-violet-500/8 border border-violet-500/15 rounded-xl p-4">
                <div className="w-8 h-8 bg-violet-500/15 rounded-lg flex items-center justify-center shrink-0">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-violet-400">
                        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M7 5v4M7 4v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </div>
                <div>
                    <p className="text-xs font-semibold text-violet-300 mb-1">Tips for great prompts</p>
                    <p className="text-xs text-white/40 leading-relaxed">
                        Be specific about style, lighting, mood, and technical details. Include negative prompts if needed.
                        The more precise, the more people will copy and use your prompt.
                    </p>
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between mb-2">
                    <Label required>Prompt Text</Label>
                    <span className={`text-[11px] font-medium ${charCount > 0 ? "text-fuchsia-400" : "text-white/20"}`}>
                        {charCount} characters
                    </span>
                </div>
                <textarea
                    value={form.promptText}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder="Write your full prompt here...
Example:
A cinematic portrait with dramatic Rembrandt lighting, one side of the face illuminated by warm golden hour light, the other in deep shadow, shot on 85mm f/1.4 lens, ultra-realistic skin texture, professional studio photography, 8K resolution --ar 2:3 --v 6"
                    rows={10}
                    className="w-full bg-white/4 border border-white/8 hover:border-white/[0.14] focus:border-fuchsia-500/50 focus:bg-white/6 rounded-xl px-4 py-3 text-sm text-white placeholder-white/15 outline-none resize-none transition-all duration-200 font-mono leading-relaxed"
                />
            </div>

            {/* AI Tool selector */}
            <div>
                <Label required>Works with</Label>
                <div className="flex flex-wrap gap-2">
                    {AI_TOOLS.map((tool) => (
                        <button
                            key={tool}
                            type="button"
                            onClick={() => {
                                const current = form.aiTools || [];
                                const updated = current.includes(tool)
                                    ? current.filter((t) => t !== tool)
                                    : [...current, tool];
                                update("aiTools", updated);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 ${(form.aiTools || []).includes(tool)
                                ? "bg-fuchsia-500/15 border-fuchsia-500/40 text-fuchsia-300"
                                : "bg-white/4 border-white/8 text-white/35 hover:border-white/15 hover:text-white/60"
                                }`}
                        >
                            {tool}
                        </button>
                    ))}
                </div>
                <p className="text-xs text-white/25 mt-2">Select all AI tools this prompt works with</p>
            </div>
        </div>
    );
}

// Step 3: Details & Tags 
function Step3({ form, update }) {
    const [tagInput, setTagInput] = useState("");

    const addTag = (tag) => {
        const cleaned = tag.trim().replace(/,/g, "");
        if (!cleaned || (form.tags || []).includes(cleaned) || (form.tags || []).length >= 8) return;
        update("tags", [...(form.tags || []), cleaned]);
        setTagInput("");
    };

    const removeTag = (tag) => update("tags", (form.tags || []).filter((t) => t !== tag));

    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(tagInput); }
        if (e.key === "Backspace" && !tagInput && form.tags?.length) removeTag(form.tags[form.tags.length - 1]);
    };

    return (
        <div className="space-y-6">

            {/* Tags */}
            <div>
                <Label>Tags</Label>
                <div className="bg-white/4 border border-white/8 hover:border-white/[0.14] focus-within:border-fuchsia-500/50 rounded-xl px-3 py-2.5 transition-all duration-200 min-h-12 flex flex-wrap gap-2 items-center">
                    {(form.tags || []).map((tag) => (
                        <span key={tag} className="flex items-center gap-1.5 bg-fuchsia-500/15 border border-fuchsia-500/25 text-fuchsia-300 text-xs font-medium px-2.5 py-1 rounded-lg">
                            {tag}
                            <button onClick={() => removeTag(tag)} className="text-fuchsia-400/60 hover:text-fuchsia-300 transition-colors">
                                <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 1.5l6 6M7.5 1.5l-6 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
                            </button>
                        </span>
                    ))}
                    <input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onBlur={() => tagInput && addTag(tagInput)}
                        placeholder={(form.tags || []).length === 0 ? "Type a tag and press Enter..." : ""}
                        className="flex-1 bg-transparent text-sm text-white placeholder-white/20 outline-none min-w-24"
                    />
                </div>
                <p className="text-xs text-white/25 mt-1.5">Up to 8 tags · Press Enter or comma to add</p>
            </div>

            {/* Pricing info */}
            <div className="bg-linear-to-br from-violet-600/10 to-fuchsia-600/10 border border-white/[0.07] rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-linear-to-br from-violet-500 to-fuchsia-600 rounded-lg flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="1.3" /><path d="M7 4.5v5M5.5 5.5C5.5 4.8 6.2 4.2 7 4.2s1.5.6 1.5 1.3-1 1.3-1.5 1.3-1.5.6-1.5 1.3 1 1.3 1.5 1.3 1.5-.6 1.5-1.3" stroke="white" strokeWidth="1.2" strokeLinecap="round" /></svg>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-white">Earn $0.001 per copy</p>
                        <p className="text-xs text-white/40">All prompts are free to use — you earn when people copy</p>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                    {[
                        { label: "100 copies", value: "$0.10" },
                        { label: "1,000 copies", value: "$1.00" },
                        { label: "10,000 copies", value: "$10.00" },
                    ].map((item) => (
                        <div key={item.label} className="bg-white/4 rounded-xl py-3">
                            <p className="text-sm font-semibold text-fuchsia-400">{item.value}</p>
                            <p className="text-[10px] text-white/30 mt-0.5">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Visibility */}
            <div>
                <Label>Visibility</Label>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { id: "public", label: "Public", desc: "Visible to everyone", icon: "🌐" },
                        { id: "draft", label: "Draft", desc: "Only visible to you", icon: "🔒" },
                    ].map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => update("visibility", opt.id)}
                            className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-150 ${form.visibility === opt.id
                                ? "border-fuchsia-500/40 bg-fuchsia-500/8"
                                : "border-white/[0.07] bg-white/3 hover:bg-white/6"
                                }`}
                        >
                            <span className="text-xl">{opt.icon}</span>
                            <div>
                                <p className={`text-sm font-medium ${form.visibility === opt.id ? "text-fuchsia-300" : "text-white/60"}`}>{opt.label}</p>
                                <p className="text-xs text-white/30">{opt.desc}</p>
                            </div>
                            {form.visibility === opt.id && (
                                <div className="ml-auto w-4 h-4 rounded-full bg-fuchsia-500 flex items-center justify-center shrink-0">
                                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l1.5 1.5 3.5-3.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Step 4: Preview
function Step4({ form }) {
    const [copied, setCopied] = useState(false);
    const cat = CATEGORIES.find((c) => c.id === form.category);

    const handleCopy = () => {
        navigator.clipboard?.writeText(form.promptText).catch(() => { });
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-5">
            <div className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden">
                {/* Card preview */}
                <div className={`h-36 bg-linear-to-br ${cat?.color || "from-white/5 to-white/10"} flex items-center justify-center relative`}>
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">
                        {cat?.icon || "✨"}
                    </div>
                    <div className="absolute top-3 right-3 flex gap-1.5 flex-wrap justify-end">
                        {(form.aiTools || []).slice(0, 2).map((t) => (
                            <span key={t} className="text-[10px] font-medium bg-black/30 backdrop-blur-sm text-white/75 px-2 py-0.5 rounded-md">{t}</span>
                        ))}
                    </div>
                    {form.visibility === "draft" && (
                        <div className="absolute top-3 left-3">
                            <span className="text-[10px] font-semibold bg-amber-500/20 border border-amber-500/30 text-amber-300 px-2 py-0.5 rounded-md">Draft</span>
                        </div>
                    )}
                </div>
                <div className="p-5">
                    <h3 className="font-semibold text-white mb-1">{form.title || "Untitled Prompt"}</h3>
                    <p className="text-sm text-white/45 leading-relaxed mb-3">{form.description || "No description added."}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {(form.tags || []).map((tag) => (
                            <span key={tag} className="text-[10px] bg-white/6 text-white/40 px-2 py-0.5 rounded-md">{tag}</span>
                        ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/6">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-[10px] font-bold text-white">Y</div>
                            <span className="text-xs text-white/40">You</span>
                        </div>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${cat?.text || "text-white/50"}`}>{cat?.label || "—"}</span>
                    </div>
                </div>
            </div>

            {/* Prompt text preview */}
            <div className="bg-white/3 border border-white/[0.07] rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/6">
                    <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">Prompt Text</p>
                    <button onClick={handleCopy} className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-150 ${copied ? "bg-emerald-500/15 text-emerald-400" : "bg-white/6 text-white/50 hover:text-white/80"}`}>
                        {copied ? <><svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>Copied</> : <><svg width="11" height="11" viewBox="0 0 11 11" fill="none"><rect x="3.5" y="3.5" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.1" /><path d="M1.5 7.5V2a1 1 0 011-1H8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" /></svg>Test Copy</>}
                    </button>
                </div>
                <div className="p-4 max-h-36 overflow-y-auto">
                    <p className="text-xs text-white/55 font-mono leading-relaxed whitespace-pre-wrap">
                        {form.promptText || "No prompt text added yet."}
                    </p>
                </div>
            </div>

            {/* Summary */}
            <div className="bg-white/3 border border-white/[0.07] rounded-2xl p-4">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Summary</p>
                <div className="space-y-2">
                    {[
                        { label: "Category", value: cat?.label || "—" },
                        { label: "AI Tools", value: (form.aiTools || []).join(", ") || "—" },
                        { label: "Tags", value: (form.tags || []).join(", ") || "—" },
                        { label: "Visibility", value: form.visibility === "draft" ? "Draft (not public)" : "Public" },
                        { label: "Prompt length", value: `${form.promptText.length} characters` },
                    ].map((row) => (
                        <div key={row.label} className="flex items-start justify-between gap-4">
                            <span className="text-xs text-white/30 shrink-0">{row.label}</span>
                            <span className="text-xs text-white/65 text-right">{row.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Main Page 

const SellPromptPage = ({ onSuccess }) => {
    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        title: "",
        category: "",
        description: "",
        promptText: "",
        aiTools: [],
        tags: [],
        visibility: "public",
    });

    const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

    // Validation per step
    const validate = (s) => {
        const errs = {};
        if (s === 1) {
            if (!form.title.trim()) errs.title = "Title is required";
            if (!form.category) errs.category = "Please select a category";
            if (!form.description.trim()) errs.description = "Description is required";
        }
        if (s === 2) {
            if (!form.promptText.trim()) errs.promptText = "Prompt text is required";
            if (!form.aiTools.length) errs.aiTools = "Select at least one AI tool";
        }
        return errs;
    };

    const nextStep = () => {
        const errs = validate(step);
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setErrors({});
        setStep((s) => s + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const prevStep = () => { setStep((s) => s - 1); setErrors({}); };

    // TODO: Replace with real API call
    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            // Example:
            // const res = await fetch("/api/prompts", {
            //   method: "POST",
            //   headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            //   body: JSON.stringify(form),
            // });
            // const data = await res.json();
            // if (!res.ok) throw new Error(data.message);
            await new Promise((r) => setTimeout(r, 1500));
            setSubmitted(true);
        } catch (err) {
            console.error("Submit failed:", err);
        } finally {
            setSubmitting(false);
        }
    };

    // Success screen
    if (submitted) {
        return (
            <div className="max-w-md mx-auto text-center">
                <div className="w-20 h-20 bg-linear-to-br from-violet-500/20 to-fuchsia-500/20 border border-fuchsia-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <circle cx="18" cy="18" r="16" stroke="url(#sg)" strokeWidth="1.5" />
                        <path d="M11 18l5 5 9-9" stroke="#e879f9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        <defs><linearGradient id="sg" x1="2" y1="2" x2="34" y2="34" gradientUnits="userSpaceOnUse"><stop stopColor="#7c3aed" /><stop offset="1" stopColor="#c026d3" /></linearGradient></defs>
                    </svg>
                </div>
                <h2 className="text-2xl font-semibold text-white mb-2">Prompt Published!</h2>
                <p className="text-sm text-white/40 leading-relaxed mb-8">
                    <span className="text-fuchsia-400 font-medium">"{form.title}"</span> is now live.
                    Every time someone copies it, you'll earn <span className="text-emerald-400">$0.001</span>.
                </p>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => { setSubmitted(false); setStep(1); setForm({ title: "", category: "", description: "", promptText: "", aiTools: [], tags: [], visibility: "public" }); }}
                        className="py-3 rounded-xl border border-white/8 text-sm font-medium text-white/55 hover:text-white/80 transition-all"
                    >
                        Add Another
                    </button>
                    <button
                        onClick={() => onSuccess && onSuccess()}
                        className="py-3 rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 text-sm font-semibold text-white transition-all"
                    >
                        View My Prompts
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto py-16 px-4">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-xl font-semibold text-white">Upload a Prompt</h1>
                <p className="text-sm text-white/35 mt-0.5">Share your prompt and earn $0.001 every time someone copies it</p>
            </div>

            {/* Step Indicator */}
            <StepIndicator currentStep={step} />

            {/* Error banner */}
            {Object.keys(errors).length > 0 && (
                <div className="bg-red-500/8 border border-red-500/20 rounded-xl px-4 py-3 mb-5 flex items-start gap-3">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="text-red-400 shrink-0 mt-0.5">
                        <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M7.5 4.5v4M7.5 10v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <div>
                        {Object.values(errors).map((err, i) => (
                            <p key={i} className="text-xs text-red-400">{err}</p>
                        ))}
                    </div>
                </div>
            )}

            {/* Form card */}
            <div className="bg-white/2 border border-white/[0.07] rounded-2xl p-6 mb-5">
                <div className="text-xs font-semibold text-white/25 uppercase tracking-widest mb-5">
                    Step {step} — {STEPS[step - 1].label}
                </div>
                {step === 1 && <Step1 form={form} update={update} />}
                {step === 2 && <Step2 form={form} update={update} />}
                {step === 3 && <Step3 form={form} update={update} />}
                {step === 4 && <Step4 form={form} update={update} />}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between">
                <button
                    onClick={prevStep}
                    disabled={step === 1}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/8 text-sm font-medium text-white/45 hover:text-white/75 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Back
                </button>

                <div className="flex items-center gap-1.5">
                    {STEPS.map((s) => (
                        <div key={s.id} className={`h-1.5 rounded-full transition-all duration-300 ${step === s.id ? "w-6 bg-fuchsia-500" : step > s.id ? "w-3 bg-emerald-500/50" : "w-3 bg-white/10"}`} />
                    ))}
                </div>

                {step < 4 ? (
                    <button onClick={nextStep} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 text-sm font-semibold text-white transition-all">
                        Next
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                ) : (
                    <button onClick={handleSubmit} disabled={submitting} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 disabled:opacity-60 text-sm font-semibold text-white transition-all shadow-lg shadow-fuchsia-900/30">
                        {submitting ? (
                            <><svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="1.5" strokeDasharray="18" strokeDashoffset="10" strokeLinecap="round" /></svg>Publishing...</>
                        ) : (
                            <><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M3 5l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>{form.visibility === "draft" ? "Save Draft" : "Publish Prompt"}</>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}

export default SellPromptPage

