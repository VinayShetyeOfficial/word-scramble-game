// MusicController.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackgroundMusicPlayer from "../BackgroundMusicPlayer/BackgroundMusicPlayer";
import { BgMusic1 } from "../../assets/assets"; // Import background music files

const musicSources = [BgMusic1];

const MusicController = () => {
  const [shouldPlayMusic, setShouldPlayMusic] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/enter-name") {
      // Set a delay to start music
      const timer = setTimeout(() => {
        setShouldPlayMusic(true);
      }, 500); // 1 second delay

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <BackgroundMusicPlayer
      sources={musicSources}
      shouldPlay={shouldPlayMusic}
    />
  );
};

export default MusicController;
