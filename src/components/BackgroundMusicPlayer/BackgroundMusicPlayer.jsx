import React, { useRef, useEffect } from "react";

const BackgroundMusicPlayer = ({ sources, shouldPlay }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true; // Explicitly set loop

      if (shouldPlay) {
        const playPromise = audioRef.current.play();

        // Handle play promise to avoid DOMException
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Audio is playing
            })
            .catch((error) => {
              console.log("Playback prevented:", error);
            });
        }
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
