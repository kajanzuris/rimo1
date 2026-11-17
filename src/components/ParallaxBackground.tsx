import React from "react";
import { Video, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

interface Props {
  src: string;
  muted?: boolean;
  seed?: number;
}

export const ParallaxBackground: React.FC<Props> = ({
  src,
  muted = true,
  seed = 1,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Zoom: sebagian seed zoom-out, sisanya zoom-in dengan kekuatan berbeda
  const strength = 1.08 + (seed % 7) * 0.01; // 1.08 – 1.14
  const zoomRange: [number, number] =
    seed % 3 === 0 ? [strength, 1.02] : [1.0, strength];

  const scale = interpolate(frame, [0, durationInFrames], zoomRange, {
    extrapolateRight: "clamp",
  });

  // Pan vertikal, arah tergantung seed
  const panDir = seed % 2 === 0 ? 1 : -1;
  const translateY = interpolate(
    frame,
    [0, durationInFrames],
    [-2 * panDir, 2 * panDir],
    { extrapolateRight: "clamp" }
  );

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <Video
        src={src}
        muted={muted}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translateY(${translateY}%)`,
        }}
      />
      {/* Vignette overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};