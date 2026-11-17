import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import type { SubSegment } from "../types";
import { THEME, KEYWORDS, FONT } from "../config";

interface Props {
  segments: SubSegment[];
}

export const Subtitles: React.FC<Props> = ({ segments }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const active = segments.find(
    (s) => frame >= s.startFrame && frame <= s.endFrame
  );
  if (!active) return null;

  const localFrame = frame - active.startFrame;
  const totalDur = active.endFrame - active.startFrame;

  // Panel spring in
  const panelScale = spring({
    frame: localFrame,
    fps,
    config: { damping: 14 },
  });

  // Panel fade out
  const panelOpacity = interpolate(
    localFrame,
    [totalDur - 8, totalDur],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Word-by-word highlight progress
  const wordProgress = interpolate(
    localFrame,
    [0, totalDur * 0.85],
    [0, active.words.length],
    { extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: 100,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity: panelOpacity,
        transform: `scale(${panelScale})`,
      }}
    >
      <div
        style={{
          background: THEME.glass,
          backdropFilter: `blur(${THEME.glassBlur}px)`,
          WebkitBackdropFilter: `blur(${THEME.glassBlur}px)`,
          border: `1px solid ${THEME.glassBorder}`,
          borderRadius: 16,
          padding: "14px 24px",
          maxWidth: "88%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 6,
        }}
      >
        {active.words.map((word, i) => {
          const isActive = i < wordProgress;
          const isKeyword = Object.keys(KEYWORDS).includes(word.toLowerCase());
          const color = isKeyword
            ? KEYWORDS[word.toLowerCase()]
            : isActive
            ? THEME.primary
            : "rgba(255,255,255,0.5)";

          return (
            <span
              key={i}
              style={{
                fontSize: 30,
                fontWeight: isKeyword ? 900 : 600,
                fontFamily: FONT.body,
                color,
                transition: "color 0.15s",
                textShadow: isActive ? THEME.textShadow : "none",
                ...(isKeyword &&
                  isActive && {
                    filter: `drop-shadow(0 0 6px ${color}80)`,
                  }),
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
