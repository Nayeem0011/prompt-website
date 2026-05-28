// import { createContext, useContext, useState, useEffect } from "react";

// const SavedContext = createContext();

// export const SavedProvider = ({ children }) => {
//   const [savedPrompts, setSavedPrompts] = useState(() => {
//     try {
//       const stored = localStorage.getItem("savedPrompts");
//       return stored ? JSON.parse(stored) : [];
//     } catch {
//       return [];
//     }
//   });

//   useEffect(() => {
//     localStorage.setItem("savedPrompts", JSON.stringify(savedPrompts));
//   }, [savedPrompts]);

//   // Save Prompt
//   const savePrompt = (prompt) => {
//     setSavedPrompts((prev) => {
//       const alreadySaved = prev.find((p) => p.id === prompt.id);
//       if (alreadySaved) return prev;
//       return [...prev, { ...prompt, savedAt: new Date().toISOString().split("T")[0] }];
//     });
//   };

//   const removePrompt = (id) => {
//     setSavedPrompts((prev) => prev.filter((p) => p.id !== id));
//   };

//   const togglePrompt = (prompt) => {
//     const isSaved = savedPrompts.find((p) => p.id === prompt.id);
//     if (isSaved) {
//       removePrompt(prompt.id);
//     } else {
//       savePrompt(prompt);
//     }
//   };

//   return (
//     <SavedContext.Provider value={{ savedPrompts, savePrompt, removePrompt, togglePrompt }}>
//       {children}
//     </SavedContext.Provider>
//   );
// };

// export const useSaved = () => useContext(SavedContext);

import { createContext, useState, useEffect } from "react";

const SavedContext = createContext();

export const SavedProvider = ({ children }) => {
  const [savedPrompts, setSavedPrompts] = useState(() => {
    try {
      const stored = localStorage.getItem("savedPrompts");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("savedPrompts", JSON.stringify(savedPrompts));
  }, [savedPrompts]);

  const savePrompt = (prompt) => {
    setSavedPrompts((prev) => {
      const alreadySaved = prev.find((p) => p.id === prompt.id);

      if (alreadySaved) return prev;

      return [
        ...prev,
        {
          ...prompt,
          savedAt: new Date().toISOString().split("T")[0],
        },
      ];
    });
  };

  const removePrompt = (id) => {
    setSavedPrompts((prev) => prev.filter((p) => p.id !== id));
  };

  const togglePrompt = (prompt) => {
    const isSaved = savedPrompts.find((p) => p.id === prompt.id);

    if (isSaved) {
      removePrompt(prompt.id);
    } else {
      savePrompt(prompt);
    }
  };

  return (
    <SavedContext.Provider
      value={{
        savedPrompts,
        savePrompt,
        removePrompt,
        togglePrompt,
      }}
    >
      {children}
    </SavedContext.Provider>
  );
};

export default SavedContext;