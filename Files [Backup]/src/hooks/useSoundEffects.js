// src/hooks/useSoundEffects.js
import { useRef } from "react";
import HoverSound from "../assets/audio/hover/hover.mp3";
import ClickSound1 from "../assets/audio/click/click1.mp3";
import BgMusic1 from "../assets/audio/background/bg_music1.mp3";

const useSoundEffects = () => {
  const hoverSound = useRef(new Audio(HoverSound));
  const clickSounds = [useRef(new Audio(ClickSound1))];
  const bgMusic = useRef(new Audio(BgMusic1));

  const playHoverSound = () => {
    hoverSound.current
      .play()
      .catch((error) => console.error("Error playing hover sound:", error));
  };

  const playClickSound = () => {
    const randomIndex = Math.floor(Math.random() * clickSounds.length);
    clickSounds[randomIndex].current
      .play()
      .catch((error) => console.error("Error playing click sound:", error));
  };

  const startBgMusic = () => {
    bgMusic.current.loop = true; // Ensure the music loops
    bgMusic.current
      .play()
      .catch((error) =>
        console.error("Error playing background music:", error)
      );
  };

  return {
    playHoverSound,
    playClickSound,
    startBgMusic,
  };
};

export default useSoundEffects;
