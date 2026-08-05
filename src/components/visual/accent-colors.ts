import type { CSSProperties } from "react";

// One accent palette for the whole site, styled inline — no CSS framework.
// Triples are RGB channels ("r g b"); text colors are hex.
export type Accent = {
  bg: string;       // darkest fill (rgb triple)
  bgTo: string;     // gradient end / border tint (rgb triple)
  bgHover: string;  // hovered fill (rgb triple)
  edge: string;     // border highlight (rgb triple)
  text: string;
  textHover: string;
};

export const accents: Record<string, Accent> = {
  purple:  { bg: "88 28 135",  bgTo: "107 33 168", bgHover: "147 51 234", edge: "168 85 247", text: "#c084fc", textHover: "#d8b4fe" },
  blue:    { bg: "30 58 138",  bgTo: "30 64 175",  bgHover: "37 99 235",  edge: "59 130 246", text: "#60a5fa", textHover: "#93c5fd" },
  indigo:  { bg: "49 46 129",  bgTo: "55 48 163",  bgHover: "79 70 229",  edge: "99 102 241", text: "#818cf8", textHover: "#a5b4fc" },
  cyan:    { bg: "22 78 99",   bgTo: "21 94 117",  bgHover: "8 145 178",  edge: "6 182 212",  text: "#22d3ee", textHover: "#67e8f9" },
  emerald: { bg: "6 78 59",    bgTo: "6 95 70",    bgHover: "5 150 105",  edge: "16 185 129", text: "#34d399", textHover: "#6ee7b7" },
  green:   { bg: "20 83 45",   bgTo: "22 101 52",  bgHover: "22 163 74",  edge: "34 197 94",  text: "#4ade80", textHover: "#86efac" },
  teal:    { bg: "19 78 74",   bgTo: "17 94 89",   bgHover: "13 148 136", edge: "20 184 166", text: "#2dd4bf", textHover: "#5eead4" },
  amber:   { bg: "120 53 15",  bgTo: "146 64 14",  bgHover: "217 119 6",  edge: "245 158 11", text: "#fbbf24", textHover: "#fcd34d" },
  rose:    { bg: "136 19 55",  bgTo: "159 18 57",  bgHover: "225 29 72",  edge: "244 63 94",  text: "#fb7185", textHover: "#fda4af" },
  gray:    { bg: "17 24 39",   bgTo: "31 41 55",   bgHover: "55 65 81",   edge: "55 65 81",   text: "#a3a3a3", textHover: "#d4d4d4" },
};

export const rgba = (triple: string, alpha: number) => `rgb(${triple} / ${alpha})`;

export const accent = (color: string, fallback = "purple"): Accent =>
  accents[color] ?? accents[fallback];

// Icon tile: dark fill that brightens on hover, matching text color shift.
export const tileStyle = (
  color: string,
  hovered: boolean,
  fallback?: string,
): { bg: CSSProperties; text: CSSProperties } => {
  const a = accent(color, fallback);
  return {
    bg: { backgroundColor: rgba(hovered ? a.bgHover : a.bg, 0.3) },
    text: { color: hovered ? a.textHover : a.text },
  };
};
