import type { VideoConfig } from "./types";

/** ========== EDIT INI SESUAI KEBUTUHAN ========== */

export const VIDEO: VideoConfig = {
  fps: 30,
  width: 720,
  height: 1280,
  durationSec: 18,
  durationFrames: 540, // fps * durationSec
  bgmVolume: 0.15,
  voVolume: 1.0,
};

/** Warna tema */
export const THEME = {
  primary: "#FFD700",       // kuning emas (CTA)
  accent: "#FF4D6D",        // merah-pink (highlight)
  text: "#FFFFFF",
  textShadow: "0 2px 8px rgba(0,0,0,0.7)",
  glass: "rgba(0,0,0,0.45)",
  glassBorder: "rgba(255,255,255,0.15)",
  glassBlur: 14,
  progressBar: "#FFD700",
  progressBg: "rgba(255,255,255,0.2)",
  particle: "#FFD700",
};


/** Palet warna yang dipilih berdasarkan seed */
export const PALETTES = [
  { primary: "#FFD700", accent: "#FF4D6D", progressBar: "#FFD700", particle: "#FFD700" }, // emas
  { primary: "#4DD0FF", accent: "#FF4D6D", progressBar: "#4DD0FF", particle: "#4DD0FF" }, // cyan
  { primary: "#00FF88", accent: "#FFD700", progressBar: "#00FF88", particle: "#00FF88" }, // mint
  { primary: "#FF8AD8", accent: "#FFD700", progressBar: "#FF8AD8", particle: "#FF8AD8" }, // pink
];

/** Kata kunci yang auto-highlight (lowercase) */
export const KEYWORDS: Record<string, string> = {
  diskon: "#FF4D6D",
  gratis: "#00FF88",
  promo: "#FFD700",
  checkout: "#FFD700",
  hemat: "#00FF88",
  murah: "#FF4D6D",
  beli: "#FFD700",
  sekarang: "#FF4D6D",
};

/** Font */
export const FONT = {
  heading: "Inter, sans-serif",
  body: "Inter, sans-serif",
};
