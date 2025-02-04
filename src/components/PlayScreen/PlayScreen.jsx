import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlayScreenWrapper from "./PlayScreenWrapper";
import MenuModal from "../MenuModal/MenuModal";
import useSoundEffects from "../../hooks/useSoundEffects";
import { useGame } from "../../contexts/GameContext"; // Added import for GameContext
import { GamepadIcon, TrophyIcon, ClockIcon } from "../../assets/assets";
import { TfiMenu } from "react-icons/tfi";
import { RiFileUploadFill } from "react-icons/ri";

const PlayScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [guess, setGuess] = useState(""); // Added guess state
  const [timeLeft, setTimeLeft] = useState(60); // Timer starts from 60 seconds
  const { playHoverSound, playClickSound } = useSoundEffects();

  // Added game context integration
  const { round, score, currentWord, startNewRound, submitGuess, uploadWords } =
    useGame();

  const navigate = useNavigate();

  // Initial round start effect
  useEffect(() => {
    startNewRound();
  }, []);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          handleEndOfRound();
          return 60; // Reset timer for next round
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle end of round
  const handleEndOfRound = () => {
    startNewRound();
  };

  // Handle guess submission
  const handleSubmit = () => {
    if (soundOn) playClickSound();
    if (submitGuess(guess)) {
      setGuess("");
      startNewRound();
      setTimeLeft(60); // Reset timer for new round
    } else {
      setGuess("");
    }
  };

  // Handle file upload
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const words = e.target.result
          .split(/\r?\n/)
          .filter((word) => word.trim() !== "");
        uploadWords(words);
      };
      reader.readAsText(file);
    }
  };

  const handleMenuClick = () => {
    if (soundOn) playClickSound();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleSound = () => {
    setSoundOn(!soundOn);
  };

  return (
    <PlayScreenWrapper className="flex flex-col min-h-screen bg-purple-700">
      {/* Header */}
      <div className="flex justify-between items-center p-2 text-white bg-transparent navbar sm:p-3 md:p-4 sm:justify-evenly">
        <button
          className="text-xl tracking-wider text-white bg-amber-700 rounded-none shadow-lg menu_btn sm:text-2xl sm:rounded-full"
          onClick={handleMenuClick}
          onMouseEnter={soundOn ? playHoverSound : null}
        >
          <span className="inline-flex items-center px-4 py-3 w-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-none -translate-y-1 menu_btn_text sm:px-6 md:px-8 sm:py-4 sm:rounded-full hover:bg-gradient-to-tl active:-translate-y-0">
            <TfiMenu className="w-6 h-6 menu_btn_icon sm:w-7 sm:h-7 md:w-8 md:h-8" />
            <span className="hidden ml-2 btn_label sm:inline">Menu</span>
          </span>
        </button>

        <div className="flex items-center px-4 py-2 space-x-3 text-base select-none game_bar sm:space-x-6 md:space-x-10 sm:py-3 md:py-5 sm:px-6 md:px-8 sm:text-xl md:text-2xl">
          <div className="flex items-center drop-shadow-[2px_2px_0px_var(--tw-shadow-color)] sm:drop-shadow-[3px_2px_0px_var(--tw-shadow-color)] shadow-violet-900">
            <img
              src={GamepadIcon}
              alt="Gamepad"
              className="hidden mr-2 w-6 h-6 game_bar_icon sm:w-7 sm:h-7 md:w-8 md:h-8 sm:mr-3 sm:block"
            />
            <span>Round: {round}</span>
          </div>
          <div className="flex items-center drop-shadow-[2px_2px_0px_var(--tw-shadow-color)] sm:drop-shadow-[3px_2px_0px_var(--tw-shadow-color)] shadow-violet-900">
            <img
              src={TrophyIcon}
              alt="Trophy"
              className="hidden mr-2 w-6 h-6 game_bar_icon sm:w-7 sm:h-7 md:w-8 md:h-8 sm:mr-3 sm:block"
            />
            <span>Score: {score}</span>
          </div>
          <div className="flex items-center drop-shadow-[2px_2px_0px_var(--tw-shadow-color)] sm:drop-shadow-[3px_2px_0px_var(--tw-shadow-color)] shadow-violet-900">
            <img
              src={ClockIcon}
              alt="Clock"
              className="hidden mr-2 w-6 h-6 game_bar_icon sm:w-7 sm:h-7 md:w-8 md:h-8 sm:mr-3 sm:block"
            />
            <span>
              Time: {Math.floor(timeLeft / 60)} :
              {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow justify-center items-center p-4 playscreen_main sm:p-1 md:p-8">
        <div className="p-6 w-full max-w-xl bg-purple-500 rounded-xl word_box_container play_box sm:p-8 md:p-12">
          <h1 className="play_box_heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold select-none text-white mb-4 sm:mb-6 md:mb-8 text-center tracking-wider drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-violet-800">
            Guess the Word
          </h1>
          <div className="p-6 mb-4 bg-purple-400 rounded-lg word_box sm:p-8 md:p-10 sm:mb-6 md:mb-8">
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center tracking-widest drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-violet-700">
              {currentWord ? currentWord.scrambled.toUpperCase() : ""}
            </p>
          </div>
          <div className="flex flex-col space-y-4 input_wrapper sm:flex-row sm:space-x-4 sm:space-y-0">
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Enter your guess"
              className="p-3 w-full text-lg tracking-wider placeholder-purple-200 text-white uppercase bg-purple-400 rounded-lg answer_field sm:text-xl md:text-2xl sm:p-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              className="mx-auto text-lg tracking-wider text-white bg-green-700 rounded-full shadow-lg submit_btn sm:text-xl md:text-2xl sm:mx-0"
              onMouseEnter={soundOn ? playHoverSound : null}
              onClick={handleSubmit}
            >
              <span className="block px-6 py-3 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full -translate-y-1 submit_btn_text sm:px-8 md:px-10 sm:py-4 hover:bg-gradient-to-tl active:-translate-y-0">
                Submit
              </span>
            </button>
          </div>
        </div>

        <input
          type="file"
          id="upload-input"
          accept=".txt"
          style={{ display: "none" }}
          onChange={handleUpload}
        />
        <label htmlFor="upload-input">
          <button
            className="mx-auto mt-6 text-lg text-white bg-amber-700 rounded-full shadow-lg upload_btn sm:mt-8 md:mt-10 sm:text-xl md:text-2xl"
            onMouseEnter={soundOn ? playHoverSound : null}
            onClick={() => document.getElementById("upload-input").click()}
          >
            <span className="block inline-flex items-center px-6 py-3 w-full tracking-wider bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-full -translate-y-1 upload_btn_text sm:px-8 md:px-10 sm:py-4 hover:bg-gradient-to-tl active:-translate-y-0">
              <RiFileUploadFill className="mr-2 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
              Word File
            </span>
          </button>
        </label>
      </div>

      {/* Menu Modal */}
      <MenuModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </PlayScreenWrapper>
  );
};

export default PlayScreen;
