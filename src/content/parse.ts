// Parses the reference markdown into a structured Parts -> Sections tree.
//
// The whole site is driven by this. When you swap the reference document,
// the navigation, lessons and reading content all update automatically —
// as long as the doc keeps the same simple shape:
//
//   # C++ ...            <- first H1 = document title (skipped as a part)
//   # PHẦN I — ...       <- H1 = a "Part" (group of sections)
//   ## 1. Section title  <- H2 = a "Section" (one lesson)
//   ...body...
//   ## 2. ...
//   # PHẦN II — ...
//   ...
//
// Headings inside ``` fenced code blocks are ignored on purpose.

export interface Section {
  /** stable id used in routes, e.g. "1", "10", "a" */
  id: string;
  /** the visible number/letter, e.g. "1", "A" (empty if none) */
  num: string;
  /** heading text without the leading number */
  title: string;
  /** raw markdown body of this section (no heading line) */
  body: string;
  /** id of the parent part */
  partId: string;
  /** part order index */
  partTitle: string;
  /** rough reading time in minutes */
  minutes: number;
  /** number of fenced code blocks in the body */
  codeBlocks: number;
}

export interface Part {
  id: string;
  title: string;
  /** short label like "PHẦN I" or "PHỤ LỤC" extracted from the heading */
  label: string;
  /** true for the "PHỤ LỤC" (appendix) group — treated as reference, not lessons */
  isAppendix: boolean;
  sections: Section[];
}

export interface Reference {
  title: string;
  intro: string;
  parts: Part[];
  /** every parsed section, incl. appendices (used for global search) */
  sections: Section[];
  /** only the numbered lessons (Parts I..N), excluding appendices */
  lessonSections: Section[];
  /** the appendix part, if present */
  appendix?: Part;
  byId: Record<string, Section>;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip diacritics
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function estimateMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}

function countCodeBlocks(text: string): number {
  const fences = text.match(/^```/gm);
  return fences ? Math.floor(fences.length / 2) : 0;
}

/** Split heading like "1. Giới thiệu ..." into { num: "1", title: "Giới thiệu ..." } */
function splitHeading(raw: string): { num: string; title: string } {
  const m = raw.match(/^([0-9]+|[A-Z])\.\s+(.*)$/);
  if (m) return { num: m[1], title: m[2].trim() };
  return { num: "", title: raw.trim() };
}

function partLabel(heading: string): string {
  // "PHẦN I — NỀN TẢNG C++" -> "PHẦN I"; "PHỤ LỤC" -> "PHỤ LỤC"
  const m = heading.match(/^(PH[ẦẦ]N\s+[IVXLC]+|PH[ỤU]\s+L[ỤU]C)/i);
  if (m) return m[1].toUpperCase();
  const dash = heading.split(/[—–-]/)[0].trim();
  return dash || heading.trim();
}

export function parseReference(raw: string): Reference {
  const lines = raw.split(/\r?\n/);

  let title = "C++ Reference";
  let intro = "";
  let seenTitle = false;
  let inFence = false;

  const parts: Part[] = [];
  let currentPart: Part | null = null;

  // section accumulation
  let secHeading: string | null = null;
  let secBuf: string[] = [];
  let introBuf: string[] = [];
  let collectingIntro = false;

  const pushSection = () => {
    if (secHeading == null || !currentPart) {
      secHeading = null;
      secBuf = [];
      return;
    }
    const { num, title: secTitle } = splitHeading(secHeading);
    const body = secBuf.join("\n").trim();
    const id = num ? num.toLowerCase() : slugify(secTitle);
    currentPart.sections.push({
      id,
      num,
      title: secTitle,
      body,
      partId: currentPart.id,
      partTitle: currentPart.label,
      minutes: estimateMinutes(body),
      codeBlocks: countCodeBlocks(body),
    });
    secHeading = null;
    secBuf = [];
  };

  const startPart = (heading: string) => {
    pushSection();
    const label = partLabel(heading);
    currentPart = {
      id: slugify(label) || slugify(heading),
      title: heading.trim(),
      label,
      isAppendix: /ph[uụ]\s*l[uụ]c/i.test(heading) || /ph[uụ]\s*l[uụ]c/i.test(label),
      sections: [],
    };
    parts.push(currentPart);
  };

  for (const line of lines) {
    if (/^```/.test(line.trim())) {
      inFence = !inFence;
      if (secHeading != null) secBuf.push(line);
      else if (collectingIntro) introBuf.push(line);
      continue;
    }

    if (!inFence && /^#\s+/.test(line)) {
      const heading = line.replace(/^#\s+/, "").trim();
      if (!seenTitle) {
        title = heading;
        seenTitle = true;
        collectingIntro = true;
        continue;
      }
      collectingIntro = false;
      startPart(heading);
      continue;
    }

    if (!inFence && /^##\s+/.test(line)) {
      const heading = line.replace(/^##\s+/, "").trim();
      // Skip meta sections (table of contents, version changelog).
      if (/mục lục|nhật ký phiên bản|changelog/i.test(heading)) {
        pushSection();
        secHeading = null;
        continue;
      }
      pushSection();
      secHeading = heading;
      secBuf = [];
      continue;
    }

    if (secHeading != null) {
      secBuf.push(line);
    } else if (collectingIntro) {
      introBuf.push(line);
    }
  }
  pushSection();

  intro = introBuf
    .join("\n")
    .replace(/^-+$/gm, "")
    .trim();

  const sections = parts.flatMap((p) => p.sections);
  const lessonSections = parts.filter((p) => !p.isAppendix).flatMap((p) => p.sections);
  const appendix = parts.find((p) => p.isAppendix);
  const byId: Record<string, Section> = {};
  for (const s of sections) byId[s.id] = s;

  return { title, intro, parts, sections, lessonSections, appendix, byId };
}
