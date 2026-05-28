import { useState, useRef } from "react";

// Mock user data (replace with real API)
const mockUser = {
    id: "usr_01",
    name: "Arif Hossain",
    username: "arif_prompts",
    email: "arif@example.com",
    bio: "AI prompt engineer & creative director. Specializing in cinematic visuals and brand identity prompts.",
    avatar: null, // URL string when set
    joined: "January 2025",
    location: "Dhaka, Bangladesh",
    website: "https://arif.dev",
    twitter: "@arif_creates",
    totalEarnings: 12.847,
    totalPrompts: 34,
    totalCopies: 12847,
    tier: "Seller",
    verified: true,
};

// Avatar component
function Avatar({ src, name, size = 80 }) {
    const initials = name?.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "?";
    return src ? (
        <img src={src} alt={name} className="rounded-2xl object-cover" style={{ width: size, height: size }} />
    ) : (
        <div
            className="rounded-2xl flex items-center justify-center font-semibold text-white"
            style={{
                width: size, height: size,
                background: "linear-gradient(135deg, #7c3aed, #c026d3)",
                fontSize: size * 0.3,
            }}
        >
            {initials}
        </div>
    );
}

// Input field
function Field({ label, value, onChange, type = "text", placeholder, icon, disabled }) {
    return (
        <div>
            <label className="block text-xs font-medium text-white/45 mb-1.5">{label}</label>
            <div className="relative">
                {icon && (
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25">{icon}</span>
                )}
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange && onChange(e.target.value)}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`w-full bg-white/5 border border-white/8 rounded-xl py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${icon ? "pl-10 pr-4" : "px-4"
                        } focus:border-fuchsia-500/45 focus:bg-white/[0.07]`}
                />
            </div>
        </div>
    );
}

// Section wrapper
function Section({ title, sub, children }) {
    return (
        <div className="bg-white/3 border border-white/[0.07] rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/6">
                <p className="text-sm font-semibold text-white">{title}</p>
                {sub && <p className="text-xs text-white/35 mt-0.5">{sub}</p>}
            </div>
            <div className="p-6">{children}</div>
        </div>
    );
}

const ProfilePage = () => {
    const [user, setUser] = useState(mockUser);
    const [form, setForm] = useState({ ...mockUser });
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [activeTab, setActiveTab] = useState("edit");
    const [avatarPreview, setAvatarPreview] = useState(null);
    const fileRef = useRef(null);

    const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

    // TODO: Replace with real API call
    const handleSave = async () => {
        setSaving(true);
        try {
            // Example:
            // const formData = new FormData();
            // Object.entries(form).forEach(([k,v]) => formData.append(k, v));
            // if (avatarFile) formData.append("avatar", avatarFile);
            // const res = await fetch("/api/profile", { method: "PUT", headers: { Authorization: `Bearer ${token}` }, body: formData });
            // const data = await res.json();
            // setUser(data.user);

            await new Promise((r) => setTimeout(r, 1000));
            setUser({ ...form });
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
        } catch (err) {
            console.error("Save failed:", err);
        } finally {
            setSaving(false);
        }
    };

    // TODO: Replace with real avatar upload API
    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setAvatarPreview(url);
        // Example: upload file to /api/profile/avatar
    };

    const tabs = [
        { id: "edit", label: "Edit Profile" },
        { id: "security", label: "Security" },
        { id: "payouts", label: "Payouts" },
    ];

    return (
        <div className="max-w-3xl mx-auto space-y-6 p-8 bg-[#07070d]">
            {/* ── Header */}
            <div>
                <h1 className="text-xl font-semibold text-white">Profile</h1>
                <p className="text-sm text-white/35 mt-0.5">Manage your account settings</p>
            </div>

            {/* ── Profile Card (public view) */}
            <div className="bg-white/3 border border-white/[0.07] rounded-2xl p-6">
                <div className="flex items-start gap-5">
                    {/* Avatar + upload */}
                    <div className="relative group shrink-0">
                        <Avatar src={avatarPreview || user.avatar} name={user.name} size={72} />
                        <button
                            onClick={() => fileRef.current?.click()}
                            className="absolute inset-0 rounded-2xl bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M3 13.5h12M9 3v9M5.5 5.5L9 2l3.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-lg font-semibold text-white">{user.name}</h2>
                            {user.verified && (
                                <span className="flex items-center gap-1 text-[11px] font-medium text-fuchsia-400 bg-fuchsia-500/10 px-2 py-0.5 rounded-md">
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Verified
                                </span>
                            )}
                            <span className="text-[11px] font-medium text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-md">
                                {user.tier}
                            </span>
                        </div>
                        <p className="text-sm text-white/40 mt-0.5">@{user.username}</p>
                        <p className="text-sm text-white/55 mt-2 leading-relaxed line-clamp-2">{user.bio}</p>
                        <div className="flex items-center gap-4 mt-3 flex-wrap">
                            <span className="flex items-center gap-1.5 text-xs text-white/30">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1C3.8 1 2 2.8 2 5c0 3 4 7 4 7s4-4 4-7c0-2.2-1.8-4-4-4z" stroke="currentColor" strokeWidth="1.1" /><circle cx="6" cy="5" r="1.2" stroke="currentColor" strokeWidth="1.1" /></svg>
                                {user.location}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-white/30">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="2.5" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.1" /><path d="M1 4.5l5 3 5-3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" /></svg>
                                Joined {user.joined}
                            </span>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="hidden md:flex gap-5 text-center">
                        {[
                            { label: "Prompts", value: user.totalPrompts },
                            { label: "Copies", value: user.totalCopies.toLocaleString() },
                            { label: "Earned", value: `$${user.totalEarnings.toFixed(2)}` },
                        ].map((s) => (
                            <div key={s.label}>
                                <p className="text-lg font-semibold text-white">{s.value}</p>
                                <p className="text-xs text-white/35">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Tabs */}
            <div className="flex gap-1 bg-white/3 border border-white/[0.07] rounded-xl p-1 w-fit">
                {tabs.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setActiveTab(t.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === t.id
                            ? "bg-white/9 text-white"
                            : "text-white/35 hover:text-white/60"
                            }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* ── Edit Profile Tab */}
            {activeTab === "edit" && (
                <div className="space-y-4">

                    {/* Basic Info */}
                    <Section title="Basic Information" sub="Your public profile details">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Field
                                label="Full Name"
                                value={form.name}
                                onChange={(v) => update("name", v)}
                                placeholder="Your name"
                                icon={
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <circle cx="7" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2" />
                                        <path d="M2.5 13c0-2.5 2-4.5 4.5-4.5S11.5 10.5 11.5 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                    </svg>
                                }
                            />
                            <Field
                                label="Username"
                                value={form.username}
                                onChange={(v) => update("username", v)}
                                placeholder="your_username"
                                icon={<span className="text-white/25 text-sm">@</span>}
                            />
                            <Field
                                label="Email"
                                value={form.email}
                                type="email"
                                onChange={(v) => update("email", v)}
                                placeholder="you@example.com"
                                icon={
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                                        <path d="M1 5l6 3.5L13 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                    </svg>
                                }
                            />
                            <Field
                                label="Location"
                                value={form.location}
                                onChange={(v) => update("location", v)}
                                placeholder="City, Country"
                                icon={
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M7 1C4.8 1 3 2.8 3 5c0 3.5 4 8 4 8s4-4.5 4-8c0-2.2-1.8-4-4-4z" stroke="currentColor" strokeWidth="1.2" />
                                        <circle cx="7" cy="5" r="1.3" stroke="currentColor" strokeWidth="1.2" />
                                    </svg>
                                }
                            />
                        </div>

                        {/* Bio */}
                        <div className="mt-4">
                            <label className="block text-xs font-medium text-white/45 mb-1.5">Bio</label>
                            <textarea
                                value={form.bio}
                                onChange={(e) => update("bio", e.target.value)}
                                rows={3}
                                maxLength={200}
                                placeholder="Tell people a little about yourself..."
                                className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none resize-none focus:border-fuchsia-500/45 focus:bg-white/[0.07] transition-all duration-200"
                            />
                            <p className="text-xs text-white/25 text-right mt-1">{form.bio.length}/200</p>
                        </div>
                    </Section>

                    {/* Links */}
                    <Section title="Social Links" sub="Optional links shown on your public profile">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Field
                                label="Website"
                                value={form.website}
                                onChange={(v) => update("website", v)}
                                placeholder="https://yoursite.com"
                                icon={
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
                                        <path d="M7 1.5c0 0-2 2-2 5.5s2 5.5 2 5.5M7 1.5c0 0 2 2 2 5.5S7 12.5 7 12.5M1.5 7h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                    </svg>
                                }
                            />
                            <Field
                                label="Twitter / X"
                                value={form.twitter}
                                onChange={(v) => update("twitter", v)}
                                placeholder="@handle"
                                icon={<span className="text-white/25 text-sm font-bold">𝕏</span>}
                            />
                        </div>
                    </Section>

                    {/* Save Button */}
                    <div className="flex items-center justify-between">
                        <p className="text-xs text-white/25">Changes are saved to your public profile</p>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 bg-linear-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 disabled:opacity-60 rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-all"
                        >
                            {saving ? (
                                <>
                                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="1.5" strokeDasharray="18" strokeDashoffset="10" strokeLinecap="round" />
                                    </svg>
                                    Saving...
                                </>
                            ) : saved ? (
                                <>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M2.5 7l3 3 6-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Saved!
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* ── Security Tab */}
            {activeTab === "security" && (
                <div className="space-y-4">
                    <Section title="Change Password" sub="Update your account password">
                        <div className="space-y-4 max-w-sm">
                            <Field label="Current Password" type="password" placeholder="••••••••" />
                            <Field label="New Password" type="password" placeholder="Min. 8 characters" />
                            <Field label="Confirm New Password" type="password" placeholder="Repeat new password" />
                            {/* TODO: wire up password change API */}
                            <button className="bg-linear-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all">
                                Update Password
                            </button>
                        </div>
                    </Section>

                    <Section title="Danger Zone" sub="Irreversible account actions">
                        <div className="flex items-center justify-between p-4 bg-red-500/5 border border-red-500/15 rounded-xl">
                            <div>
                                <p className="text-sm font-medium text-white/80">Delete Account</p>
                                <p className="text-xs text-white/35 mt-0.5">Permanently delete your account and all data</p>
                            </div>
                            {/* TODO: wire up account deletion API */}
                            <button className="px-4 py-2 border border-red-500/30 hover:bg-red-500/10 text-red-400 text-sm font-medium rounded-xl transition-all">
                                Delete
                            </button>
                        </div>
                    </Section>
                </div>
            )}

            {/* ── Payouts Tab */}
            {activeTab === "payouts" && (
                <div className="space-y-4">
                    <Section title="Payout Method" sub="Where your earnings are sent">
                        <div className="space-y-4 max-w-md">
                            <Field
                                label="bKash / Nagad Number"
                                placeholder="+880 1XXX-XXXXXX"
                                icon={
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <rect x="3" y="1" width="8" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                                        <path d="M6 10h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                    </svg>
                                }
                            />
                            <Field
                                label="PayPal Email"
                                type="email"
                                placeholder="paypal@example.com"
                                icon={
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                                        <path d="M1 5.5l6 3.5 6-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                    </svg>
                                }
                            />
                            {/* TODO: wire up payout method save API */}
                            <button className="bg-linear-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all">
                                Save Payout Method
                            </button>
                        </div>
                    </Section>

                    <Section title="Earnings History" sub="All time payout records">
                        <div className="space-y-3">
                            {/* TODO: fetch real payout history from /api/payouts */}
                            {[
                                { date: "May 1, 2025", amount: 3.50, status: "paid" },
                                { date: "Apr 1, 2025", amount: 2.80, status: "paid" },
                                { date: "Mar 1, 2025", amount: 1.95, status: "paid" },
                            ].map((p, i) => (
                                <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                                    <div>
                                        <p className="text-sm text-white/75">{p.date}</p>
                                        <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                                            Paid
                                        </span>
                                    </div>
                                    <p className="text-sm font-semibold text-fuchsia-400">+${p.amount.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </Section>
                </div>
            )}

        </div>
    )
}

export default ProfilePage
