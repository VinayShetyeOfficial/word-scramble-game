// src/contexts/MusicContext.jsx

import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { BgMusic1 } from "../assets/assets";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [isMusicOn, setIsMusicOn] = useState(true);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const audioRef = useRef(new Audio(BgMusic1));

  const handleMusicEnd = useCallback(() => {
    // When music ends, turn it off
    setIsMusicOn(false);

    // Reset the audio time to beginning
    audioRef.current.currentTime = 0;

    // After 5 seconds delay, turn music back on
    setTimeout(() => {
      setIsMusicOn(true);
      audioRef.current
        .play()
        .catch((error) => console.error("Error replaying music:", error));
    }, 5000); // 5 second delay before restart
  }, []);

  useEffect(() => {
    // Add ended event listener
    audioRef.current.addEventListener("ended", handleMusicEnd);

    return () => {
      audioRef.current.removeEventListener("ended", handleMusicEnd);
    };
  }, [handleMusicEnd]);

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
