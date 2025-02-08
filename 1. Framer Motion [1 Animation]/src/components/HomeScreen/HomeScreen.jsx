import React, { useState } from "react";
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
  const [hasInteracted, setHasInteracted] = useState(false);
  const [playerName, setPlayerName] = useState("");

  const handlePlayClick = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      setTimeout(() => {
        startMusic();
      }, 1300);
    }
    playClickSound();
    setAnimate(true);
    setTimeout(() => {
      navigate("/enter-name");
    }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim().length <= 1) {
      // Don't proceed if name is 1 character or less
      return;
    }

    const playButton = document.querySelector(".play");
    const playText = document.querySelector(".play-text");

    playButton.classList.add("scale-15");
    playText.classList.add("opacity-0");

    setTimeout(() => {
      navigate("/loadingScreen", { state: { playerName: playerName.trim() } });
    }, 1000);
  };

  return (
    <HomeScreenWrapper className="flex justify-center items-center min-h-screen select-none">
      <div className="p-4 text-center md:p-6 lg:p-10 wrapper">
        <div className="title animate__animated animate__zoomInDown text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[120px] uppercase tracking-wider text-white drop-shadow-[4px_3px_0px_var(--tw-shadow-color)] shadow-blue-900">
          Scramble
        </div>
        <div className="mt-8 space-x-2 font-sans text-3xl font-semibold sm:mt-4 md:mt-10 sm:space-x-3 md:space-x-4 lg:space-x-5 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl letters">
          <span className="letter bg-gradient-to-b from-yellow-300 to-orange-500 text-violet-900 w-[2.5rem] sm:w-[3rem] md:w-[4rem] lg:w-[5rem] xl:w-[6rem] pt-1 sm:pt-1.5 md:pt-2 pb-2 sm:pb-2.5 md:pb-3 font-bold rounded-xl border-b-[5px] border-orange-700 inline-block">
            W
          </span>
          <span className="letter bg-gradient-to-b from-yellow-300 to-orange-500 text-violet-900 w-[2.5rem] sm:w-[3rem] md:w-[4rem] lg:w-[5rem] xl:w-[6rem] pt-1 sm:pt-1.5 md:pt-2 pb-2 sm:pb-2.5 md:pb-3 font-bold rounded-xl border-b-[5px] border-orange-700 inline-block">
            O
          </span>
          <span className="letter bg-gradient-to-b from-yellow-300 to-orange-500 text-violet-900 w-[2.5rem] sm:w-[3rem] md:w-[4rem] lg:w-[5rem] xl:w-[6rem] pt-1 sm:pt-1.5 md:pt-2 pb-2 sm:pb-2.5 md:pb-3 font-bold rounded-xl border-b-[5px] border-orange-700 inline-block">
            R
          </span>
          <span className="letter bg-gradient-to-b from-yellow-300 to-orange-500 text-violet-900 w-[2.5rem] sm:w-[3rem] md:w-[4rem] lg:w-[5rem] xl:w-[6rem] pt-1 sm:pt-1.5 md:pt-2 pb-2 sm:pb-2.5 md:pb-3 font-bold rounded-xl border-b-[5px] border-orange-700 inline-block">
            D
          </span>
          <span className="letter bg-gradient-to-b from-yellow-300 to-orange-500 text-violet-900 w-[2.5rem] sm:w-[3rem] md:w-[4rem] lg:w-[5rem] xl:w-[6rem] pt-1 sm:pt-1.5 md:pt-2 pb-2 sm:pb-2.5 md:pb-3 font-bold rounded-xl border-b-[5px] border-orange-700 inline-block">
            S
          </span>
        </div>
        <button
          className={`play mt-6 sm:mt-8 md:mt-10 lg:mt-14 bg-green-800 text-2xl sm:text-3xl md:text-4xl lg:text-5xl mx-auto text-white rounded-full shadow-lg transform transition-transform duration-1000 ${
            animate ? "scale-15" : ""
          }`}
          onClick={handlePlayClick}
          onMouseEnter={playHoverSound}
        >
          <span
            className={`play-text bg-gradient-to-tl hover:bg-gradient-to-br from-green-400 via-green-500 to-green-600 w-full block px-8 sm:px-10 md:px-12 lg:px-14 py-3 sm:py-4 md:py-4 lg:py-5 rounded-full -translate-y-1 active:-translate-y-0 transition-opacity duration-1000 ${
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
