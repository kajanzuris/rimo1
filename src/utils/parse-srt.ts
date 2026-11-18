import type { SubSegment } from "../types";
import { KEYWORDS } from "../config";

function timeToSec(t: string): number {
  const [h, m, rest] = t.split(":");
  const [s, ms] = rest.split(",");
  return +h * 3600 + +m * 60 + +s + +ms / 1000;
}

export function parseSrt(srtContent: string, fps: number): SubSegment[] {
  const raw = srtContent;
  if (!raw || !raw.trim()) return [];
  const blocks = raw.trim().split(/\n\s*\n/);

  return blocks.map((block) => {
    const lines = block.split("\n").map((l) => l.trim());
    const id = parseInt(lines[0], 10);
    const [startStr, endStr] = lines[1].split(" --> ");
    const text = lines.slice(2).join(" ");
    const startSec = timeToSec(startStr.trim());
    const endSec = timeToSec(endStr.trim());
    const words = text.split(/\s+/);

    // Auto-detect keyword
    const keyword = words.find((w) =>
      Object.keys(KEYWORDS).includes(w.toLowerCase())
    );

    return {
      id,
      startFrame: Math.round(startSec * fps),
      endFrame: Math.round(endSec * fps),
      startSec,
      endSec,
      text,
      words,
      keyword,
    };
  });
}
