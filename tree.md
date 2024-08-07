src
├── assets
│ ├── audio
│ │ ├── background
│ │ │ ├── extras
│ │ │ │ ├── bg_music2.mp3
│ │ │ │ ├── bg_music3.mp3
│ │ │ │ └── bg_music4.mp3
│ │ │ └── bg_music1.mp3
│ │ ├── hover
│ │ │ └── hover.mp3
│ │ ├── click
│ │ │ ├── click3.mp3
│ │ │ ├── click1.mp3
│ │ │ └── click2.mp3
│ │ └── answer_status
│ │ ├── correct_1.mp3
│ │ ├── correct_2.mp3
│ │ ├── correct_3.mp3
│ │ ├── correct_4.mp3
│ │ ├── correct_5.mp3
│ │ ├── correct_6.mp3
│ │ ├── wrong_1.mp3
│ │ ├── wrong_2.mp3
│ │ ├── wrong_3.mp3
│ │ ├── wrong_4.mp3
│ │ ├── wrong_5.mp3
│ │ └── wrong_6.mp3
│ ├── images
│ │ └── icons
│ │ ├── gamepad.png
│ │ ├── trophy.png
│ │ ├── clock.png
│ │ ├── hamburger_menu.png
│ │ ├── upload.png
│ │ └── close.png
│ ├── fonts
│ └── assets.js
├── components
│ ├── BackgroundMusicPlayer
│ │ ├── BackgroundMusicPlayer.jsx
│ │ └── BackgroundMusicPlayerWrapper.js
│ ├── HomeScreen
│ │ ├── HomeScreen.jsx
│ │ └── HomeScreenWrapper.js
│ ├── Instructions
│ │ ├── Instructions.jsx
│ │ └── InstructionsWrapper.js
│ ├── Leaderboard
│ │ ├── Leaderboard.jsx
│ │ └── LeaderboardWrapper.js
│ ├── PlayScreen
│ │ ├── PlayScreen.jsx
│ │ └── PlayScreenWrapper.js
│ ├── MenuModal
│ │ ├── MenuModal.jsx
│ │ └── MenuModalWrapper.jsx
│ └── MusicController
│ └── MusicController.jsx
├── contexts
│ ├── GameContext.jsx
│ └── MusicContext.jsx
├── hooks
│ ├── useLocalStorage.js
│ └── useSoundEffects.js
├── pages
│ ├── HomePage.jsx
│ ├── NameEntryPage.jsx
│ ├── HomePageWrapper.js
│ ├── NameEntryPageWrapper.js
│ ├── LoadingScreenWrapper.js
│ └── LoadingScreen.jsx
├── utils
│ └── wordUtils.js
├── App.css
├── index.css
├── main.jsx
└── App.jsx
src
├── assets
│ ├── images
│ │ └── icons
│ │ ├── gamepad.png
│ │ ├── trophy.png
│ │ ├── clock.png
│ │ ├── hamburger_menu.png
│ │ ├── upload.png
│ │ └── close.png
│ ├── audio
│ │ ├── hover
│ │ │ └── hover.mp3
│ │ ├── click
│ │ │ ├── click3.mp3
│ │ │ ├── click1.mp3
│ │ │ └── click2.mp3
│ │ ├── background
│ │ │ ├── extras
│ │ │ │ ├── bg_music2.mp3
│ │ │ │ ├── bg_music3.mp3
│ │ │ │ └── bg_music4.mp3
│ │ │ └── bg_music1.mp3
│ │ └── answer_status
│ │ ├── correct_1.mp3
│ │ ├── correct_2.mp3
│ │ ├── correct_3.mp3
│ │ ├── correct_4.mp3
│ │ ├── correct_5.mp3
│ │ ├── correct_6.mp3
│ │ ├── wrong_1.mp3
│ │ ├── wrong_2.mp3
│ │ ├── wrong_3.mp3
│ │ ├── wrong_4.mp3
│ │ ├── wrong_5.mp3
│ │ └── wrong_6.mp3
│ ├── fonts
│ └── assets.js
├── components
│ ├── BackgroundMusicPlayer
│ │ ├── BackgroundMusicPlayer.jsx
│ │ └── BackgroundMusicPlayerWrapper.js
│ ├── HomeScreen
│ │ ├── HomeScreen.jsx
│ │ └── HomeScreenWrapper.js
│ ├── Instructions
│ │ ├── Instructions.jsx
│ │ └── InstructionsWrapper.js
│ ├── Leaderboard
│ │ ├── Leaderboard.jsx
│ │ └── LeaderboardWrapper.js
│ ├── PlayScreen
│ │ ├── PlayScreen.jsx
│ │ └── PlayScreenWrapper.js
│ ├── MenuModal
│ │ ├── MenuModal.jsx
│ │ └── MenuModalWrapper.jsx
│ └── MusicController
│ └── MusicController.jsx
├── contexts
│ ├── GameContext.jsx
│ └── MusicContext.jsx
├── hooks
│ ├── useLocalStorage.js
│ └── useSoundEffects.js
├── pages
│ ├── HomePage.jsx
│ ├── NameEntryPage.jsx
│ ├── HomePageWrapper.js
│ ├── NameEntryPageWrapper.js
│ ├── LoadingScreenWrapper.js
│ └── LoadingScreen.jsx
├── utils
│ └── wordUtils.js
├── App.css
├── index.css
├── main.jsx
└── App.jsx

## BackgroundMusicPlayer.jsx

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

## HomeScreen.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeScreenWrapper from "./HomeScreenWrapper";
import useSoundEffects from "../../hooks/useSoundEffects";
import "animate.css";

const HomeScreen = () => {
const [animate, setAnimate] = useState(false);
const navigate = useNavigate();
const { playHoverSound, playClickSound } = useSoundEffects();

const handlePlayClick = () => {
playClickSound(); // Play click sound
setAnimate(true);
setTimeout(() => {
navigate("/enter-name");
}, 1100);
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
className={`play mt-14 bg-green-800 text-5xl mx-auto text-white rounded-full shadow-lg transform transition-transform duration-1000 ${
            animate ? "scale-15" : ""
          }`}
onClick={handlePlayClick}
onMouseEnter={playHoverSound} // Play hover sound on mouse enter >
<span
className={`play-text bg-gradient-to-tl hover:bg-gradient-to-br  from-green-400 via-green-500 to-green-600 w-full block px-20 py-5 rounded-full -translate-y-1 active:-translate-y-0 transition-opacity duration-1000 ${
              animate ? "opacity-0" : "opacity-100"
            }`} >
Play
</span>
</button>
</div>
</HomeScreenWrapper>
);
};

export default HomeScreen;

## Instructions.jsx

import InstructionsWrapper from "./InstructionsWrapper";

const Instructions = () => {
return (

<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 via-green-600 to-green-700">
<h1 className="text-5xl font-bold text-white mb-8">Game Instructions</h1>
<p className="text-3xl text-white text-center">
Welcome to the Word Scramble Game! The objective is simple: unscramble
the given word. You can choose different game modes and even upload your
own list of words. Have fun and try to get the highest score!
</p>
</div>
);
};

export default Instructions;

## MenuModal

import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import MenuModalWrapper from "./MenuModalWrapper";
import { CloseIcon } from "../../assets/assets";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import { PiInfoFill } from "react-icons/pi";
import { IoCheckmarkCircle } from "react-icons/io5";
import { FaRegLightbulb, FaFileUpload } from "react-icons/fa";
import { RxLapTimer } from "react-icons/rx";
import { MdUpload } from "react-icons/md";
import useSoundEffects from "../../hooks/useSoundEffects";
import { useMusic } from "../../contexts/MusicContext";

const MenuModal = ({ isOpen, onClose }) => {
const { isMusicOn, isSoundOn, toggleMusic, toggleSound } = useMusic();
const [isHelpOpen, setIsHelpOpen] = useState(false);
const { playHoverSound, playClickSound } = useSoundEffects();

useEffect(() => {
// This effect will run whenever isMusicOn changes
console.log("Music state changed:", isMusicOn);
}, [isMusicOn]);

if (!isOpen) return null;

const handleToggleMusic = () => {
console.log("Music state before toggle:", isMusicOn);
playClickSound();
toggleMusic();
console.log("Music state after toggle:", !isMusicOn);
};

const handleToggleSound = () => {
playClickSound();
toggleSound();
};

const openHelp = () => {
playClickSound();
setIsHelpOpen(true);
};

const closeHelp = () => {
playClickSound();
setIsHelpOpen(false);
};

return (
<MenuModalWrapper className="fixed inset-0 flex items-center justify-center z-50">
<div
        className="fixed inset-0 bg-slate-900 opacity-70"
        onClick={onClose}
      ></div>
<div className="modal_box p-16 rounded-2xl shadow-lg z-50 max-w-xl w-full relative bg-purple-700 select-none">
<div className="modal_box_wrapper flex justify-between items-center mb-6">
<h2 className="text-4xl font-bold text-center flex-grow text-white drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-violet-900">
Menu
</h2>
<button
onClick={() => {
playClickSound();
onClose();
}}
onMouseEnter={playHoverSound}
className="absolute right-4 top-4" >
<img
              src={CloseIcon}
              alt="Close"
              className="btn-close rounded-full w-14 h-14"
            />
</button>
</div>
<div className="btn_wrapper flex flex-col space-y-4 text-xl">
<button
            className="modal-btn tracking-wider bg-green-700 text-2xl mx-auto text-white rounded-full shadow-lg transform transition-transform duration-1000 w-full max-w-[280px]"
            onClick={handleToggleSound}
            onMouseEnter={playHoverSound}
          >
<span className="modal-btn-text inline-flex justify-center bg-gradient-to-br from-green-400 via-green-500 to-green-600 w-full block px-10 py-4 rounded-full -translate-y-1 hover:bg-gradient-to-tl active:-translate-y-0 transition-opacity duration-1000">
{isSoundOn ? "Sound On" : "Sound Off"}
{isSoundOn ? (
<HiMiniSpeakerWave className="icon w-8 h-8 ml-2" />
) : (
<HiMiniSpeakerXMark className="icon w-8 h-8 ml-2 text-green-800" />
)}
</span>
</button>
<button
            className="modal-btn tracking-wider bg-green-700 text-2xl mx-auto text-white rounded-full shadow-lg transform transition-transform duration-1000 w-full max-w-[280px]"
            onClick={handleToggleMusic}
            onMouseEnter={playHoverSound}
          >
<span className="modal-btn-text inline-flex justify-center bg-gradient-to-br from-green-400 via-green-500 to-green-600 w-full block px-10 py-4 rounded-full -translate-y-1 hover:bg-gradient-to-tl active:-translate-y-0 transition-opacity duration-1000">
{isMusicOn ? "Music On" : "Music Off"}
{isMusicOn ? (
<HiMiniSpeakerWave className="icon w-8 h-8 ml-2" />
) : (
<HiMiniSpeakerXMark className="icon w-8 h-8 ml-2 text-green-800" />
)}
</span>
</button>
<button
            className="modal-btn tracking-wider bg-green-700 text-2xl mx-auto text-white rounded-full shadow-lg transform transition-transform duration-1000 w-full max-w-[280px]"
            onClick={openHelp}
            onMouseEnter={playHoverSound}
          >
<span className="modal-btn-text inline-flex justify-center bg-gradient-to-br from-green-400 via-green-500 to-green-600 w-full block px-10 py-4 rounded-full -translate-y-1 hover:bg-gradient-to-tl active:-translate-y-0 transition-opacity duration-1000">
Help <PiInfoFill className="icon w-8 h-8 ml-2" />
</span>
</button>
<button
            className="modal-btn tracking-wider bg-green-700 text-2xl mx-auto text-white rounded-full shadow-lg transform transition-transform duration-1000 w-full max-w-[280px]"
            onClick={playClickSound}
            onMouseEnter={playHoverSound}
          >
<span className="modal-btn-text inline-flex justify-center bg-gradient-to-br from-green-400 via-green-500 to-green-600 w-full block px-10 py-4 rounded-full -translate-y-1 hover:bg-gradient-to-tl active:-translate-y-0 transition-opacity duration-1000">
Words Found{" "}
<IoCheckmarkCircle className="icon w-8 h-8 ml-2 active:text-green-800" />
</span>
</button>
<button
className="modal-btn tracking-wider bg-green-700 text-2xl mx-auto text-white rounded-full shadow-lg transform transition-transform duration-1000 w-full max-w-[280px]"
onClick={() => {
playClickSound();
onClose();
}}
onMouseEnter={playHoverSound} >
<span className="modal-btn-text bg-gradient-to-br from-green-400 via-green-500 to-green-600 w-full block px-10 py-4 rounded-full -translate-y-1 hover:bg-gradient-to-tl active:-translate-y-0 transition-opacity duration-1000">
Quit
</span>
</button>
</div>
{isHelpOpen && (
<div className="fixed inset-0 flex items-center justify-center z-60">
<div
              className="fixed inset-0 bg-slate-900 opacity-50"
              onClick={closeHelp}
            ></div>
<div className="help_modal relative bg-white p-8 rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto z-70">
<button
                onClick={closeHelp}
                onMouseEnter={playHoverSound}
                className="absolute top-0 right-0 w-12 h-12 flex items-center justify-center text-gray-500 hover:text-red-600"
              >
<IoClose className="w-8 h-8" />
</button>
<h3 className="text-3xl font-bold mb-4 text-center text-purple-700 tracking-wider">
Game Instructions
</h3>
<div className="modal_items space-y-4">
<div className="modal_item item_1 flex items-start space-x-4 space-x-2 mb-4">
<RxLapTimer className="modal_icon icon_1 text-green-500 w-20 h-6" />
<p className="text-lg leading-5 tracking-wide font-sans font-bold">
<strong className="text-green-600">Timed Rounds:</strong>{" "}
Each round of the game has a timer. Guess the scrambled
words before time runs out!
</p>
</div>
<div className="modal_item item_2 flex items-start space-x-4 space-x-2 mb-4">
<FaFileUpload className="modal_icon icon_2 text-blue-500 w-20 h-6" />
<p className="text-lg leading-5 tracking-wide font-sans font-bold">
<strong className="text-blue-600">Upload Words:</strong> You
can upload a text file with your own set of words. Supported
formats include .txt and others.
</p>
</div>
<div className="modal_item item_3 flex items-start space-x-4 space-x-2 mb-4">
<FaRegLightbulb className="modal_icon icon_3 text-yellow-500 w-20 h-6" />
<p className="text-lg leading-5 tracking-wide font-sans font-bold">
<strong className="text-yellow-600">Hints:</strong> Use
hints if you get stuck. Each hint will reveal one letter of
the word.
</p>
</div>
<div className="modal_item item_4 flex items-start space-x-4 space-x-2 mb-4">
<MdUpload className="modal_icon icon_4 text-red-500 w-20 h-6" />
<p className="text-lg leading-5 tracking-wide font-sans font-bold">
<strong className="text-red-600">Leaderboard:</strong> Check
out the top players on the leaderboard. Aim for the highest
score!
</p>
</div>
</div>
</div>
</div>
)}
</div>
</MenuModalWrapper>
);
};

export default MenuModal;

## MusicController.jsx

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

## PlayScreen.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlayScreenWrapper from "./PlayScreenWrapper";
import MenuModal from "../MenuModal/MenuModal";
import useSoundEffects from "../../hooks/useSoundEffects"; // Import sound effects hook
import { GamepadIcon, TrophyIcon, ClockIcon } from "../../assets/assets";
import { TfiMenu } from "react-icons/tfi";
import { RiFileUploadFill } from "react-icons/ri";

const PlayScreen = () => {
const [isModalOpen, setIsModalOpen] = useState(false);
const [soundOn, setSoundOn] = useState(true); // State for sound effects toggle
const { playHoverSound, playClickSound } = useSoundEffects(); // Destructure the sound functions

const handleMenuClick = () => {
if (soundOn) playClickSound(); // Play click sound if soundOn is true
setIsModalOpen(true);
};

const handleCloseModal = () => {
setIsModalOpen(false);
};

const toggleSound = () => {
setSoundOn(!soundOn); // Toggle sound effects
};

return (
<PlayScreenWrapper className="bg-purple-700 min-h-screen flex flex-col">
{/_ Header _/}

<div className="navbar bg-transparent text-white p-4 flex justify-evenly items-center text-2xl">
<button
className="menu_btn tracking-wider ml-8 bg-amber-700 text-2xl text-white rounded-full shadow-lg transform transition-transform duration-1000"
onClick={handleMenuClick}
onMouseEnter={soundOn ? playHoverSound : null} // Play hover sound if soundOn is true >
<span className="menu_btn_text bg-gradient-to-br inline-flex items-center from-amber-400 via-amber-500 to-amber-600 w-full px-8 py-4 rounded-full -translate-y-1 hover:bg-gradient-to-tl active:-translate-y-0 transition-opacity duration-1000">
<TfiMenu className="menu_btn_icon w-8 h-8 mr-2" />
<span className="btn_label">Menu</span>
</span>
</button>
<div className="game_bar select-none flex items-center space-x-10 space-x-5px rounded-xl py-5 px-8">
<div className="flex items-center drop-shadow-[3px_2px_0px_var(--tw-shadow-color)] shadow-violet-900">
<img
              src={GamepadIcon}
              alt="Gamepad"
              className="game_bar_icon w-8 h-8 mr-3"
            />
<span>Round: 5</span>
</div>
<div className="flex items-center drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-violet-900">
<img
              src={TrophyIcon}
              alt="Trophy"
              className="game_bar_icon w-8 h-8 mr-3"
            />
<span>Score: 120</span>
</div>
<div className="flex items-center drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-violet-900">
<img
              src={ClockIcon}
              alt="Clock"
              className="game_bar_icon w-8 h-8 mr-3"
            />
<span>Time: 1 : 23</span>
</div>
</div>
</div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-8">
        <div className="play_box bg-purple-500 rounded-xl p-12 w-full max-w-xl">
          <h1 className="text-6xl font-bold select-none text-white mb-8 text-center tracking-wider drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-violet-800">
            Guess the Word
          </h1>
          <div className="word_box bg-purple-400 rounded-lg p-10 mb-8">
            <p className="text-5xl select-none font-bold text-white text-center tracking-widest drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-violet-700">
              ELPPA
            </p>
          </div>
          <div className="input_wrapper flex space-x-4">
            <input
              type="text"
              placeholder="Enter your guess"
              className="answer_field flex-grow tracking-wider uppercase text-2xl bg-purple-400 text-white placeholder-purple-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              className="submit_btn tracking-wider ml-8 bg-green-700 text-2xl text-white rounded-full shadow-lg transform transition-transform duration-1000"
              onMouseEnter={soundOn ? playHoverSound : null} // Play hover sound if soundOn is true
              onClick={soundOn ? playClickSound : null} // Play click sound if soundOn is true
            >
              <span className="submit_btn_text bg-gradient-to-br from-green-400 via-green-500 to-green-600 block px-10 py-4 rounded-full -translate-y-1 hover:bg-gradient-to-tl active:-translate-y-0 transition-opacity duration-1000">
                Submit
              </span>
            </button>
          </div>
        </div>
        <button
          className="upload_btn mx-auto mt-10 bg-amber-700 text-2xl text-white rounded-full shadow-lg transform transition-transform duration-1000"
          onMouseEnter={soundOn ? playHoverSound : null} // Play hover sound if soundOn is true
          onClick={soundOn ? playClickSound : null} // Play click sound if soundOn is true
        >
          <span className="upload_btn_text tracking-wider bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 w-full block px-10 py-4 rounded-full -translate-y-1 hover:bg-gradient-to-tl active:-translate-y-0 transition-opacity duration-1000 inline-flex items-center">
            <RiFileUploadFill alt="Upload" className="w-7 h-7 mr-2" />
            Word File
          </span>
        </button>
        <br />
      </div>

      {/* Menu Modal */}
      <MenuModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </PlayScreenWrapper>

);
};

export default PlayScreen;

## GameContext

import React, { createContext, useState } from "react";

export const GameContext = createContext();

const GameProvider = ({ children }) => {
const [gameMode, setGameMode] = useState(null);
const [playerName, setPlayerName] = useState("");
// Add other state variables and functions as needed

return (
<GameContext.Provider
value={{ gameMode, setGameMode, playerName, setPlayerName }} >
{children}
</GameContext.Provider>
);
};

export default GameProvider;

## MusicContext

import React, { createContext, useState, useContext, useEffect } from "react";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
const [isPlaying, setIsPlaying] = useState(false);

const startMusic = () => {
setIsPlaying(true);
};

const stopMusic = () => {
setIsPlaying(false);
};

return (
<MusicContext.Provider value={{ isPlaying, startMusic, stopMusic }}>
{children}
</MusicContext.Provider>
);
};

export const useMusic = () => {
return useContext(MusicContext);
};

## useLocalStorage.js

import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
const [storedValue, setStoredValue] = useState(() => {
try {
const item = window.localStorage.getItem(key);
return item ? JSON.parse(item) : initialValue;
} catch (error) {
console.error(error);
return initialValue;
}
});

const setValue = (value) => {
try {
const valueToStore =
value instanceof Function ? value(storedValue) : value;
setStoredValue(valueToStore);
window.localStorage.setItem(key, JSON.stringify(valueToStore));
} catch (error) {
console.error(error);
}
};

return [storedValue, setValue];
};

export default useLocalStorage;

## useSoundEffcets.js

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
const randomIndex = Math.floor(Math.random() \* clickSounds.length);
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

## LoadingScreen.jsx

import { useLocation, useNavigate } from "react-router-dom";
import LoadingScreenWrapper from "./LoadingScreenWrapper";
import React, { useState, useEffect } from "react";

const LoadingScreen = () => {
const location = useLocation();
const navigate = useNavigate();
const { playerName } = location.state || { playerName: "Player" };

useEffect(() => {
const timer = setTimeout(() => {
navigate("/playScreen");
}, 3000);

    return () => clearTimeout(timer); // Clear the timeout if the component unmounts

}, [navigate]);

return (
<LoadingScreenWrapper className="min-h-screen select-none flex justify-center items-center bg-gradient-to-br from-blue-400 via-blue-600 to-blue-800">

<div className="p-10 text-center">
<h1 className="text-5xl font-bold text-white mb-8 tracking-widest drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-blue-800">
Welcome, {playerName}!
</h1>
<p className="text-3xl text-white tracking-wider drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-blue-900 text-balance">
Your game will start soon
<span className="dot-container">
<span className="dot drop-shadow-[2px_2px_1px_var(--tw-shadow-color)] shadow-blue-800 "></span>
<span className="dot drop-shadow-[2px_2px_1px_var(--tw-shadow-color)] shadow-blue-800 "></span>
<span className="dot drop-shadow-[2px_2px_1px_var(--tw-shadow-color)] shadow-blue-800 "></span>
</span>
</p>
</div>
</LoadingScreenWrapper>
);
};

export default LoadingScreen;

## NameEntryPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NameEntryPageWrapper from "./NameEntryPageWrapper";
import useSoundEffects from "../hooks/useSoundEffects"; // Import sound effects hook

const NameEntryPage = () => {
const [animate, setAnimate] = useState(false);
const [name, setName] = useState("");
const navigate = useNavigate();
const { playHoverSound, playClickSound } = useSoundEffects(); // Destructure the sound functions

const handleStartGame = () => {
if (name.trim() !== "") {
playClickSound(); // Play click sound
setAnimate(true);
setTimeout(() => {
navigate("/load", { state: { playerName: name } });
}, 1100);
}
};

return (
<NameEntryPageWrapper className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-400 via-green-600 to-green-800">

<div className="container p-10 text-center">
<h1 className="label_name text-7xl font-bold select-none text-white mb-5 tracking-wide drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-green-800">
Enter Your Name
</h1>
<input
type="text"
value={name}
onChange={(e) => setName(e.target.value)}
placeholder="Your Name"
className="name_field text-3xl my-8 text-teal-600 p-4 tracking-wider rounded-lg md:shadow-lg shadow-md focus:outline-none outline outline-0 focus:outline-0 border-0"
/>
<button
className={`btn_start_game mt-4 ml-8 select-none bg-blue-700 text-4xl mx-auto text-white rounded-full shadow-lg transform transition-transform duration-1000 ${
            animate ? "scale-15" : ""
          }`}
onClick={handleStartGame}
onMouseEnter={playHoverSound} // Play hover sound >
<span
className={`btn_start_game-text bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 w-full block px-10 py-4 rounded-full -translate-y-1 hover:bg-gradient-to-tl active:-translate-y-0 transition-opacity duration-1000 ${
              animate ? "opacity-0" : "opacity-100"
            }`} >
Start
</span>
</button>
</div>
</NameEntryPageWrapper>
);
};

export default NameEntryPage;

## App.jsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import NameEntryPage from "./pages/NameEntryPage";
import LoadingScreen from "./pages/LoadingScreen";
import PlayScreen from "./components/PlayScreen/PlayScreen";
import Instructions from "./components/Instructions/Instructions";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import GameProvider from "./contexts/GameContext";
import { MusicProvider } from "./contexts/MusicContext"; // Import MusicProvider
import MusicController from "./components/MusicController/MusicController";

function App() {
return (
<GameProvider>
<MusicProvider>
{" "}
{/_ Wrap the Router with MusicProvider _/}
<Router>
<MusicController />
<Routes>
<Route path="/" element={<HomeScreen />} />
<Route path="/enter-name" element={<NameEntryPage />} />
<Route path="/load" element={<LoadingScreen />} />
<Route path="/playScreen" element={<PlayScreen />} />
<Route path="/instructions" element={<Instructions />} />
<Route path="/leaderboard" element={<Leaderboard />} />
</Routes>
</Router>
</MusicProvider>
</GameProvider>
);
}

export default App;

Note: I am in the midst of developing a WORD SCRAMBLE Game using REACT/TailwindCSS.

Completed:
HomeScreen, NamePageEntry, LoadingScree, PlayScreen, MenuModal.

Left:
Fixing the Audio Play Behavior - for now help me write code to make [SoundOn/Off, MusicOn/Off] buttons in MenuModal that must toggle the BackgroundMusic and Button Hover/Click Sound throught all pages of the game
