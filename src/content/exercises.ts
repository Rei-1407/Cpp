// Parses Appendix F ("Bài tập thực hành theo phần") into structured groups so
// the Exercises page can render interactive checklists with PR-link tracking.
import { reference } from "./reference";

export interface ExerciseItem {
  id: string;
  text: string; // markdown
  advanced: boolean; // marked with ★
}

export interface ExerciseGroup {
  id: string;
  title: string;
  intro?: string;
  items: ExerciseItem[];
}

function slug(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseGroups(body: string): ExerciseGroup[] {
  const groups: ExerciseGroup[] = [];
  let current: ExerciseGroup | null = null;
  let inFence = false;

  for (const line of body.split(/\r?\n/)) {
    if (/^```/.test(line.trim())) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const h = line.match(/^###\s+(.*)$/);
    if (h) {
      current = { id: slug(h[1]), title: h[1].trim(), items: [] };
      groups.push(current);
      continue;
    }

    // list item: "1. ..." or "- ..." (also "1. ★ ...")
    const li = line.match(/^\s*(?:\d+\.|[-*])\s+(.*)$/);
    if (li && current) {
      const text = li[1].trim();
      current.items.push({
        id: `${current.id}-${current.items.length + 1}`,
        text: text.replace(/^★\s*/, ""),
        advanced: /★/.test(text),
      });
    }
  }

  return groups.filter((g) => g.items.length > 0);
}

const fSection = reference.appendix?.sections.find((s) => /bài tập/i.test(s.title));

export const exerciseGroups: ExerciseGroup[] = fSection ? parseGroups(fSection.body) : [];

export const exerciseIntro: string = fSection
  ? fSection.body.split(/\r?\n/).find((l) => /^cách dùng/i.test(l.trim())) ?? ""
  : "";

export const totalExercises = exerciseGroups.reduce((n, g) => n + g.items.length, 0);
