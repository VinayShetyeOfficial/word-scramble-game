// src/hooks/useSoundEffects.js

import { useRef } from "react";
import { useMusic } from "../contexts/MusicContext";
import HoverSound from "../assets/audio/hover/hover.mp3";
import ClickSound1 from "../assets/audio/click/click1.mp3";

const useSoundEffects = () => {
  const { isSoundOn } = useMusic();
  const hoverSound = useRef(new Audio(HoverSound));
  const clickSounds = [useRef(new Audio(ClickSound1))];

  const playHoverSound = () => {
    if (isSoundOn) {
      hoverSound.current
        .play()
        .catch((error) => console.error("Error playing hover sound:", error));
    }
  };

  const playClickSound = () => {
    if (isSoundOn) {
      const randomIndex = Math.floor(Math.random() * clickSounds.length);
      clickSounds[randomIndex].current
        .play()
        .catch((error) => console.error("Error playing click sound:", error));
    }
  };

  return { playHoverSound, playClickSound };
};

export default useSoundEffects;
