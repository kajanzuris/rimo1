import React from "react";
import { useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import { THEME, FONT } from "../config";

interface Props {
  text: string;
  enterFrame: number;
  exitFrame: number;
}

export const CallToAction: React.FC<Props> = ({ text, enterFrame, exitFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < enterFrame || frame > exitFrame) return null;

  const localFrame = frame - enterFrame;
  const totalDur = exitFrame - enterFrame;

  const scale = spring({
    frame: localFrame,
    fps,
    config: { damping: 8, stiffness: 180 },
  });

  // Pulse effect
  const pulse = 1 + Math.sin(localFrame * 0.25) * 0.03;

  const opacity = interpolate(
    localFrame,
    [totalDur - 10, totalDur],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: 180,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity,
      }}
    >
      <div
        style={{
          background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.accent})`,
          borderRadius: 50,
          padding: "16px 40px",
          transform: `scale(${scale * pulse})`,
          boxShadow: `0 4px 24px ${THEME.primary}60`,
        }}
      >
        <span
          style={{
            color: "#000",
            fontSize: 28,
            fontWeight: 900,
            fontFamily: FONT.heading,
            letterSpacing: 1,
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};
