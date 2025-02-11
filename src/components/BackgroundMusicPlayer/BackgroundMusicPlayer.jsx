import React, { useRef, useEffect } from "react";

const BackgroundMusicPlayer = ({ sources, shouldPlay }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (shouldPlay) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reset to start
      }
    }
  }, [shouldPlay]);

  return (
    <audio ref={audioRef} loop>
      {sources.map((src, index) => (
        <source key={index} src={src} type="audio/mpeg" />
      ))}
    </audio>
  );
};

export default BackgroundMusicPlayer;
