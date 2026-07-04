// Single source of truth: the reference doc at the repo root.
// Swap that file (keep the same heading shape) and the whole site updates.
import raw from "../../Cpp_Game_Dev_Reference.md?raw";
import { parseReference } from "./parse";

export const reference = parseReference(raw);
export const rawMarkdown = raw;
