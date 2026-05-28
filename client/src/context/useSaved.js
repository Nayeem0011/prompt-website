import { useContext } from "react";
import SavedContext from "./SavedContext";

export const useSaved = () => useContext(SavedContext);
