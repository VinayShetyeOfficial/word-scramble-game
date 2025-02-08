// MusicController.jsx
import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackgroundMusicPlayer from "../BackgroundMusicPlayer/BackgroundMusicPlayer";
import { BgMusic1 } from "../../assets/assets";
import { useMusic } from "../../contexts/MusicContext";

const musicSources = [BgMusic1];

const MusicController = () => {
  const { isMusicOn } = useMusic();
  const location = useLocation();
  const audioRef = useRef(new Audio(BgMusic1));

  useEffect(() => {
    audioRef.current.loop = true;

    if (location.pathname === "/enter-name") {
      const timer = setTimeout(() => {
        if (isMusicOn) {
          audioRef.current
            .play()
            .catch((error) => console.error("Error playing music:", error));
        }
      }, 500);

      return () => {
        clearTimeout(timer);
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      };
    }
  }, [location.pathname, isMusicOn]);

  useEffect(() => {
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

  return (
    <BackgroundMusicPlayer
      sources={musicSources}
      shouldPlay={isMusicOn && location.pathname === "/enter-name"}
    />
  );
};

export default MusicController;
