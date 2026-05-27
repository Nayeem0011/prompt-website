// import React from 'react'
// import { useOutletContext } from "react-router-dom";
// import { useSaved } from '../../context/SavedContext';
// import { Bookmark, BookmarkCheck } from "lucide-react";
// import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

// const demoPrompts = [
//   { id: 1, title: "Cinematic Portrait Lighting", category: "portraits", copies: 1240, rating: 4.9, tags: ["Midjourney", "Portrait"], color: "from-violet-500/20 to-fuchsia-500/20", featured: true, newest: false, author: "arif_prompts", savedAt: new Date().toISOString().split("T")[0], description: "A powerful prompt for cinematic, dramatic portrait lighting with deep shadows.", promptText: "A cinematic portrait with dramatic Rembrandt lighting, deep shadows on one side of the face, warm golden key light, shot on 85mm lens, bokeh background..." },
//   { id: 2, title: "Product Ad Copy Generator", category: "ads", copies: 870, rating: 4.7, tags: ["GPT-4", "Marketing"], color: "from-amber-500/20 to-orange-500/20", featured: true, newest: true, author: "studio_ai", savedAt: new Date().toISOString().split("T")[0], description: "Generate compelling product ad copy for any niche.", promptText: "Write a high-converting product ad copy for [product], targeting [audience], emphasizing [benefit], with a strong CTA..." },
//   { id: 3, title: "Minimalist Logo Concepts", category: "brand", copies: 540, rating: 4.8, tags: ["DALL-E", "Branding"], color: "from-blue-500/20 to-cyan-500/20", featured: false, newest: true, author: "brandmaster", savedAt: new Date().toISOString().split("T")[0], description: "Generate beautiful minimalist logo concepts for modern brands.", promptText: "A minimalist logo concept, clean geometric shapes, single color, negative space, modern sans-serif typography, vector style..." },
//   { id: 4, title: "Isometric 3D Room Design", category: "illustration", copies: 2100, rating: 5.0, tags: ["Midjourney", "3D"], color: "from-teal-500/20 to-emerald-500/20", featured: true, newest: false, author: "pixel_wizard", savedAt: new Date().toISOString().split("T")[0], description: "Ultra-detailed isometric 3D room designs with cozy lighting.", promptText: "An isometric 3D cozy room, warm lighting, detailed furniture, plants, bookshelves, soft shadows, pastel color palette, architectural visualization..." },
//   { id: 5, title: "Retro Poster Generator", category: "posters", copies: 330, rating: 4.6, tags: ["Stable Diffusion"], color: "from-pink-500/20 to-rose-500/20", featured: false, newest: true, author: "neon_creator", savedAt: new Date().toISOString().split("T")[0], description: "Create stunning retro-style posters with vintage typography.", promptText: "A retro vintage poster design, distressed texture, bold typography, limited color palette, halftone dots, 1970s aesthetic..." },
//   { id: 6, title: "Anime Portrait Style", category: "portraits", copies: 1800, rating: 4.9, tags: ["Midjourney", "Anime"], color: "from-violet-500/20 to-blue-500/20", featured: true, newest: false, author: "anime_pro", savedAt: new Date().toISOString().split("T")[0], description: "High-quality anime-style portrait prompts for character art.", promptText: "An anime-style portrait, detailed eyes, soft cel shading, pastel background, studio ghibli inspired, high detail, professional illustration..." },
// ];

// const Home = () => {
//   const { activePage, activeCategory, setActiveCategory } = useOutletContext();
//   const { togglePrompt, savedPrompts } = useSaved();

//   const byPage = demoPrompts.filter((p) => {
//     if (activePage === "featured") return p.featured;
//     if (activePage === "newest") return p.newest;
//     if (activePage === "popular") return [...demoPrompts].sort((a, b) => b.copies - a.copies);
//     return true;
//   });

//   const filtered =
//     activeCategory === "all"
//       ? byPage
//       : byPage.filter((p) => p.category === activeCategory);

//   const finalList =
//     activePage === "popular"
//       ? [...filtered].sort((a, b) => b.copies - a.copies)
//       : filtered;

//   const pageTitle = {
//     home: "Discover Prompts",
//     featured: "Featured Prompts",
//     newest: "Newest Prompts",
//     popular: "Most Popular",
//   }[activePage] || "Discover Prompts";

//   return (
//     <div className="p-8">
//       {/* Page Header */}
//       <div className="mb-8">
//         <h1 className="text-2xl font-semibold text-white mb-1">{pageTitle}</h1>
//         <p className="text-white/40 text-sm">
//           {finalList.length} prompts found
//           {activeCategory !== "all" ? ` in ${activeCategory}` : ""}
//         </p>
//       </div>

//       {/* Prompt Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//         {finalList.map((prompt) => (
//           <div
//             key={prompt.id}
//             className="group bg-white/3 border border-white/6 rounded-2xl overflow-hidden hover:border-white/12 hover:bg-white/5 transition-all duration-300 cursor-pointer"
//           >
//             {/* Card Image Area */}
//             <div className={`h-44 bg-linear-to-br ${prompt.color} flex items-center justify-center relative`}>
//               <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
//                 <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
//                   <path d="M8 14h12M14 8v12" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
//                   <circle cx="14" cy="14" r="5" stroke="white" strokeWidth="1.5" opacity="0.4" />
//                 </svg>
//               </div>

//               {/* Popular badge */}
//               {activePage === "popular" && (
//                 <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm text-yellow-400 text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
//                   🔥 {prompt.copies.toLocaleString()}
//                 </div>
//               )}

//               <div className="absolute top-3 right-3 left-3 flex items-center justify-between gap-1.5">
//                 {/* Tags */}
//                 <div className="flex flex-wrap gap-1">
//                   {prompt.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       className="text-[10px] font-medium bg-black/30 backdrop-blur-sm text-white/70 px-2 py-0.5 rounded-md"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>

//                 {/* Save Button */}
//                 <button
//                   onClick={() => togglePrompt(prompt)}
//                   className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 shrink-0 cursor-pointer
//                     ${savedPrompts.find((p) => p.id === prompt.id)
//                       ? "bg-linear-to-r from-violet-700 to-fuchsia-700 text-white shadow-inner"
//                       : "bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-lg shadow-fuchsia-900/30 hover:scale-105 active:scale-95"
//                     }`}
//                 >
//                   {savedPrompts.find((p) => p.id === prompt.id) ? (
//                     <>
//                       <BookmarkCheck size={14} strokeWidth={2.5} />
//                       <span>Saved</span>
//                     </>
//                   ) : (
//                     <>
//                       <Bookmark size={14} strokeWidth={2.5} />
//                       <span>Save</span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Card Body */}
//             <div className="p-4">
//               <h3 className="font-semibold text-sm text-white/90 mb-3 group-hover:text-white transition-colors">
//                 {prompt.title}
//               </h3>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3 text-xs text-white/30">
//                   <span className="flex items-center gap-1">
//                     <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
//                       <path d="M2 9c0-1.7 1.8-3 4-3s4 1.3 4 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
//                       <circle cx="6" cy="4" r="2" stroke="currentColor" strokeWidth="1.2" />
//                     </svg>
//                     {prompt.copies.toLocaleString()}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
//                       <path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 9 2.5 10.5l.5-3.5L.5 4.5 4 4 6 1z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
//                     </svg>
//                     {prompt.rating}
//                   </span>
//                 </div>
//                 {/* Category click → filter */}
//                 <button
//                   onClick={() =>
//                     setActiveCategory(
//                       activeCategory === prompt.category ? "all" : prompt.category
//                     )
//                   }
//                   className="text-xs font-medium px-3 py-1.5 bg-white/6 hover:bg-white/10 border border-white/8 text-white/70 hover:text-white rounded-lg transition-all duration-200"
//                 >
//                   {prompt.category}
//                 </button>

//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {finalList.length === 0 && (
//         <div className="text-center py-20 text-white/30">
//           <p className="text-lg">No prompts found</p>
//           <p className="text-sm mt-1">Try a different category</p>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Home


import React from 'react'
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { useSaved } from '../../context/SavedContext';
import { Bookmark, BookmarkCheck } from "lucide-react";

const demoPrompts = [
  { id: 1, title: "Cinematic Portrait Lighting", category: "portraits", copies: 1240, rating: 4.9, tags: ["Midjourney", "Portrait"], color: "from-violet-500/20 to-fuchsia-500/20", featured: true, newest: false, author: "arif_prompts", savedAt: new Date().toISOString().split("T")[0], description: "A powerful prompt for cinematic, dramatic portrait lighting with deep shadows.", promptText: "A cinematic portrait with dramatic Rembrandt lighting, deep shadows on one side of the face, warm golden key light, shot on 85mm lens, bokeh background..." },
  { id: 2, title: "Product Ad Copy Generator", category: "ads", copies: 870, rating: 4.7, tags: ["GPT-4", "Marketing"], color: "from-amber-500/20 to-orange-500/20", featured: true, newest: true, author: "studio_ai", savedAt: new Date().toISOString().split("T")[0], description: "Generate compelling product ad copy for any niche.", promptText: "Write a high-converting product ad copy for [product], targeting [audience], emphasizing [benefit], with a strong CTA..." },
  { id: 3, title: "Minimalist Logo Concepts", category: "brand", copies: 540, rating: 4.8, tags: ["DALL-E", "Branding"], color: "from-blue-500/20 to-cyan-500/20", featured: false, newest: true, author: "brandmaster", savedAt: new Date().toISOString().split("T")[0], description: "Generate beautiful minimalist logo concepts for modern brands.", promptText: "A minimalist logo concept, clean geometric shapes, single color, negative space, modern sans-serif typography, vector style..." },
  { id: 4, title: "Isometric 3D Room Design", category: "illustration", copies: 2100, rating: 5.0, tags: ["Midjourney", "3D"], color: "from-teal-500/20 to-emerald-500/20", featured: true, newest: false, author: "pixel_wizard", savedAt: new Date().toISOString().split("T")[0], description: "Ultra-detailed isometric 3D room designs with cozy lighting.", promptText: "An isometric 3D cozy room, warm lighting, detailed furniture, plants, bookshelves, soft shadows, pastel color palette..." },
  { id: 5, title: "Retro Poster Generator", category: "posters", copies: 330, rating: 4.6, tags: ["Stable Diffusion"], color: "from-pink-500/20 to-rose-500/20", featured: false, newest: true, author: "neon_creator", savedAt: new Date().toISOString().split("T")[0], description: "Create stunning retro-style posters with vintage typography.", promptText: "A retro vintage poster design, distressed texture, bold typography, limited color palette, halftone dots, 1970s aesthetic..." },
  { id: 6, title: "Anime Portrait Style", category: "portraits", copies: 1800, rating: 4.9, tags: ["Midjourney", "Anime"], color: "from-violet-500/20 to-blue-500/20", featured: true, newest: false, author: "anime_pro", savedAt: new Date().toISOString().split("T")[0], description: "High-quality anime-style portrait prompts for character art.", promptText: "An anime-style portrait, detailed eyes, soft cel shading, pastel background, studio ghibli inspired, high detail..." },
];

const Home = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { togglePrompt, savedPrompts } = useSaved();

  // pathname থেকে activePage বের করো
  const activePage = location.pathname.replace("/", "") || "home";

  // URL query থেকে activeCategory
  const activeCategory = searchParams.get("category") || "all";

  const setActiveCategory = (catId) => {
    const params = new URLSearchParams(searchParams);
    if (catId === "all") {
      params.delete("category");
    } else {
      params.set("category", catId);
    }
    const query = params.toString();
    navigate(`${location.pathname}${query ? `?${query}` : ""}`);
  };

  const byPage = demoPrompts.filter((p) => {
    if (activePage === "featured") return p.featured;
    if (activePage === "newest") return p.newest;
    return true;
  });

  const filtered =
    activeCategory === "all"
      ? byPage
      : byPage.filter((p) => p.category === activeCategory);

  const finalList =
    activePage === "popular"
      ? [...filtered].sort((a, b) => b.copies - a.copies)
      : filtered;

  const pageTitle = {
    home: "Discover Prompts",
    featured: "Featured Prompts",
    newest: "Newest Prompts",
    popular: "Most Popular",
  }[activePage] || "Discover Prompts";

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white mb-1">{pageTitle}</h1>
        <p className="text-white/40 text-sm">
          {finalList.length} prompts found
          {activeCategory !== "all" ? ` in ${activeCategory}` : ""}
        </p>
      </div>

      {/* Prompt Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {finalList.map((prompt) => (
          <div
            key={prompt.id}
            className="group bg-white/3 border border-white/6 rounded-2xl overflow-hidden hover:border-white/12 hover:bg-white/5 transition-all duration-300 cursor-pointer"
          >
            {/* Card Image Area */}
            <div className={`h-44 bg-linear-to-br ${prompt.color} flex items-center justify-center relative`}>
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M8 14h12M14 8v12" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                  <circle cx="14" cy="14" r="5" stroke="white" strokeWidth="1.5" opacity="0.4" />
                </svg>
              </div>

              {/* Popular badge */}
              {activePage === "popular" && (
                <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm text-yellow-400 text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                  🔥 {prompt.copies.toLocaleString()}
                </div>
              )}

              <div className="absolute top-3 right-3 left-3 flex items-center justify-between gap-1.5">
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {prompt.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-medium bg-black/30 backdrop-blur-sm text-white/70 px-2 py-0.5 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Save Button */}
                <button
                  onClick={() => togglePrompt(prompt)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 shrink-0 cursor-pointer
                    ${savedPrompts.find((p) => p.id === prompt.id)
                      ? "bg-linear-to-r from-violet-700 to-fuchsia-700 text-white shadow-inner"
                      : "bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-lg shadow-fuchsia-900/30 hover:scale-105 active:scale-95"
                    }`}
                >
                  {savedPrompts.find((p) => p.id === prompt.id) ? (
                    <><BookmarkCheck size={14} strokeWidth={2.5} /><span>Saved</span></>
                  ) : (
                    <><Bookmark size={14} strokeWidth={2.5} /><span>Save</span></>
                  )}
                </button>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4">
              <h3 className="font-semibold text-sm text-white/90 mb-3 group-hover:text-white transition-colors">
                {prompt.title}
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-white/30">
                  <span className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 9c0-1.7 1.8-3 4-3s4 1.3 4 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      <circle cx="6" cy="4" r="2" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                    {prompt.copies.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 9 2.5 10.5l.5-3.5L.5 4.5 4 4 6 1z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                    </svg>
                    {prompt.rating}
                  </span>
                </div>
                {/* Category click → filter */}
                <button
                  onClick={() => setActiveCategory(activeCategory === prompt.category ? "all" : prompt.category)}
                  className="text-xs font-medium px-3 py-1.5 bg-white/6 hover:bg-white/10 border border-white/8 text-white/70 hover:text-white rounded-lg transition-all duration-200"
                >
                  {prompt.category}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {finalList.length === 0 && (
        <div className="text-center py-20 text-white/30">
          <p className="text-lg">No prompts found</p>
          <p className="text-sm mt-1">Try a different category</p>
        </div>
      )}
    </div>
  );
};

export default Home;