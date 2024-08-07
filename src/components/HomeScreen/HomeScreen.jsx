import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeScreenWrapper from "./HomeScreenWrapper";
import useSoundEffects from "../../hooks/useSoundEffects";
import { useMusic } from "../../contexts/MusicContext";
import "animate.css";

const HomeScreen = () => {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
  const { playHoverSound, playClickSound } = useSoundEffects();
  const { startMusic } = useMusic();

  const handlePlayClick = () => {
    playClickSound();
    setAnimate(true);
    setTimeout(() => {
      navigate("/enter-name");
      startMusic(); // Start the background music
    }, 1200);
  };

  return (
    <HomeScreenWrapper className="min-h-screen select-none flex justify-center items-center">
      <div className="wrapper p-10 text-center">
        <div className="title animate__animated animate__zoomInDown text-[120px] uppercase tracking-wider text-white drop-shadow-[4px_3px_0px_var(--tw-shadow-color)] shadow-blue-900">
          Scramble
        </div>
        <div className="letters font-sans text-7xl space-x-5 font-semibold mt-4">
          <span className="letter bg-gradient-to-b from-yellow-300 to-orange-500 text-violet-900 w-[6rem] pt-2 pb-3 font-bold rounded-xl border-b-[5px] border-orange-700 inline-block">
            W
          </span>
          <span className="letter bg-gradient-to-b from-yellow-300 to-orange-500 text-violet-900 w-[6rem] pt-2 pb-3 font-bold rounded-xl border-b-[5px] border-orange-700 inline-block">
            O
          </span>
          <span className="letter bg-gradient-to-b from-yellow-300 to-orange-500 text-violet-900 w-[6rem] pt-2 pb-3 font-bold rounded-xl border-b-[5px] border-orange-700 inline-block">
            R
          </span>
          <span className="letter bg-gradient-to-b from-yellow-300 to-orange-500 text-violet-900 w-[6rem] pt-2 pb-3 font-bold rounded-xl border-b-[5px] border-orange-700 inline-block">
            D
          </span>
          <span className="letter bg-gradient-to-b from-yellow-300 to-orange-500 text-violet-900 w-[6rem] pt-2 pb-3 font-bold rounded-xl border-b-[5px] border-orange-700 inline-block">
            S
          </span>
        </div>
        <button
          className="play mt-14 bg-green-800 text-5xl mx-auto text-white rounded-full shadow-lg transform transition-transform duration-1000"
          onClick={() => {
            playClickSound();
            handlePlayClick();
          }}
          onMouseEnter={playHoverSound}
        >
          <span
            className={`play-text bg-gradient-to-tl hover:bg-gradient-to-br  from-green-400 via-green-500 to-green-600 w-full block px-20 py-5 rounded-full -translate-y-1 active:-translate-y-0 transition-opacity duration-1000 ${
              animate ? "opacity-0" : "opacity-100"
            }`}
          >
            Play
          </span>
        </button>
      </div>
    </HomeScreenWrapper>
  );
};

export default HomeScreen;
