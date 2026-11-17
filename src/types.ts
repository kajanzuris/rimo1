export interface SubSegment {
  id: number;
  startFrame: number;
  endFrame: number;
  startSec: number;
  endSec: number;
  text: string;
  words: string[];
  /** Keyword to highlight (optional) */
  keyword?: string;
}

export interface VideoConfig {
  fps: number;
  width: number;
  height: number;
  durationSec: number;
  durationFrames: number;
  bgmVolume: number;
  voVolume: number;
}
