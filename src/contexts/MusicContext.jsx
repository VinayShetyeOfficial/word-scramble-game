// src/contexts/MusicContext.jsx

import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useRef,
} from "react";
import { BgMusic1 } from "../assets/assets";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [isMusicOn, setIsMusicOn] = useState(true);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const audioRef = useRef(new Audio(BgMusic1));

  const startMusic = useCallback(() => {
    if (isMusicOn) {
      audioRef.current
        .play()
        .catch((error) => console.error("Error playing music:", error));
    }
  }, [isMusicOn]);

  const toggleMusic = useCallback(() => {
    setIsMusicOn((prevState) => {
      if (!prevState) {
        audioRef.current
          .play()
          .catch((error) => console.error("Error playing music:", error));
      } else {
        audioRef.current.pause();
      }
      return !prevState;
    });
  }, []);

  const toggleSound = useCallback(() => {
    setIsSoundOn((prevState) => !prevState);
  }, []);

  const resetGame = useCallback(() => {
    setIsMusicOn(true);
    setIsSoundOn(true);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }, []);

  const value = {
    isMusicOn,
    isSoundOn,
    toggleMusic,
    toggleSound,
    startMusic,
    resetGame,
  };

  return (
    <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};
