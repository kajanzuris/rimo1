import { Composition } from "remotion";
import { MainComposition } from "./Composition";
import type { MainProps } from "./Composition";
import { VIDEO } from "./config";

const defaultProps: MainProps = {
  video: "video.mp4",
  audio: "audio.mp3",
  audioMode: "mp3",
  durationSec: VIDEO.durationFrames / VIDEO.fps,
  seed: 1,
  srtContent: "",
};

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Main"
      component={MainComposition}
      durationInFrames={VIDEO.durationFrames}
      fps={VIDEO.fps}
      width={VIDEO.width}
      height={VIDEO.height}
      defaultProps={defaultProps}
      calculateMetadata={({ props }) => ({
        durationInFrames: Math.ceil(props.durationSec * VIDEO.fps),
      })}
    />
  );
};
