// src/components/MusicController/MusicController.jsx

import React, { useEffect, useRef } from "react";
import { useMusic } from "../../contexts/MusicContext";
import { BgMusic1 } from "../../assets/assets";

const MusicController = () => {
  const { isMusicOn } = useMusic();
  const audioRef = useRef(new Audio(BgMusic1));

  useEffect(() => {
    audioRef.current.loop = true;

    if (isMusicOn) {
      audioRef.current
        .play()
        .catch((error) => console.error("Error playing music:", error));
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, [isMusicOn]);

  return null;
};

export default MusicController;
