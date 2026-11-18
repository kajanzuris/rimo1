import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { ParallaxBackground } from "./components/ParallaxBackground";
import { Subtitles } from "./components/Subtitles";
import { KineticText } from "./components/KineticText";
import { GlassPanel } from "./components/GlassPanel";
import { ProgressBar } from "./components/ProgressBar";
import { Particles } from "./components/Particles";
import { CallToAction } from "./components/CallToAction";
import { parseSrt } from "./utils/parse-srt";
import { VIDEO, THEME, PALETTES } from "./config";

export type MainProps = {
  video: string;
  audio: string;
  audioMode: "video" | "mp3" | "both" | "mute";
  durationSec: number;
  seed: number;
  /** Raw SRT file content (passed via job.json props) */
  srtContent: string;
};

const ALL_STYLES = ["bounce", "scale", "wave", "typewriter"] as const;

export const MainComposition: React.FC<MainProps> = ({
  video,
  audio,
  audioMode,
  seed,
  srtContent,
}) => {
  // Parse SRT from props string (no filesystem access needed)
  const segments = parseSrt(srtContent ?? "", VIDEO.fps);
  // Palet warna per seed (komponen lain membaca THEME)
  Object.assign(THEME, PALETTES[seed % PALETTES.length]);

  // Urutan gaya teks diputar sesuai seed
  const shift = seed % ALL_STYLES.length;
  const kineticStyles = [
    ...ALL_STYLES.slice(shift),
    ...ALL_STYLES.slice(0, shift),
    ALL_STYLES[shift],
  ];
  const flip = seed % 2 === 0;

  // Video dibisukan kalau pakai mp3 atau mute
  const videoMuted = audioMode === "mp3" || audioMode === "mute";
  const playMp3 = (audioMode === "mp3" || audioMode === "both") && !!audio;

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {/* Layer 1: Video background with parallax */}
      <ParallaxBackground src={staticFile(video)} muted={videoMuted} seed={seed} />

      {/* Layer 2: Floating particles */}
      <Particles seed={seed} />

      {/* Layer 3: Kinetic text headlines inside glass panels */}
      {segments.map((seg, i) => (
        <GlassPanel
          key={`panel-${seg.id}`}
          enterFrame={seg.startFrame}
          exitFrame={seg.endFrame}
          position={(i % 2 === 0) === flip ? "center" : "top"}
          width="85%"
        >
          <KineticText
            text={seg.text}
            enterFrame={seg.startFrame}
            exitFrame={seg.endFrame}
            fontSize={i === segments.length - 1 ? 36 : 40}
            style={kineticStyles[i % kineticStyles.length]}
          />
        </GlassPanel>
      ))}

      {/* Layer 4: Subtitles with word-by-word highlight */}
      <Subtitles segments={segments} />

      {/* Layer 5: CTA button on last segment */}
      {segments.length > 0 && (
        <CallToAction
          text="🛒 CHECKOUT SEKARANG!"
          enterFrame={segments[segments.length - 1].startFrame + 10}
          exitFrame={segments[segments.length - 1].endFrame}
        />
      )}

      {/* Layer 6: Audio - voiceover */}
      {playMp3 && <Audio src={staticFile(audio)} volume={VIDEO.voVolume} />}

      {/* Layer 7: Progress bar */}
      <ProgressBar />
    </AbsoluteFill>
  );
};
