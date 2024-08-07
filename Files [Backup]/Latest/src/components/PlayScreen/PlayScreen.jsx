import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PlayScreenWrapper from "./PlayScreenWrapper";
import MenuModal from "../MenuModal/MenuModal";
import useSoundEffects from "../../hooks/useSoundEffects";
import { useGame } from "../../contexts/GameContext";
import { GamepadIcon, TrophyIcon, ClockIcon } from "../../assets/assets";
import { TfiMenu } from "react-icons/tfi";
import { RiFileUploadFill } from "react-icons/ri";
import FileUploadComponent from "../FileUploadComponent";

const PlayScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [guess, setGuess] = useState("");
  const [timeLeft, setTimeLeft] = useState(60); // Timer starts from 60 seconds
  const { playHoverSound, playClickSound } = useSoundEffects();
  const { round, score, currentWord, startNewRound, submitGuess, uploadWords } =
    useGame();
  const navigate = useNavigate();

  useEffect(() => {
    startNewRound();
  }, []);

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

  const handleEndOfRound = () => {
    startNewRound();
  };

  const handleSubmit = () => {
    playClickSound();
    if (submitGuess(guess)) {
      setGuess("");
      startNewRound();
      setTimeLeft(60); // Reset timer for new round
    } else {
      setGuess("");
    }
  };

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
    <PlayScreenWrapper className="bg-purple-700 min-h-screen flex flex-col">
      <div className="navbar bg-transparent text-white p-4 flex justify-evenly items-center text-2xl">
        <button
          className="menu_btn tracking-wider ml-8 bg-amber-700 text-2xl text-white rounded-full shadow-lg transform transition-transform duration-1000"
          onClick={handleMenuClick}
          onMouseEnter={soundOn ? playHoverSound : null}
        >
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
            <span>Round: {round}</span>
          </div>
          <div className="flex items-center drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-violet-900">
            <img
              src={TrophyIcon}
              alt="Trophy"
              className="game_bar_icon w-8 h-8 mr-3"
            />
            <span>Score: {score}</span>
          </div>
          <div className="flex items-center drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-violet-900">
            <img
              src={ClockIcon}
              alt="Clock"
              className="game_bar_icon w-8 h-8 mr-3"
            />
            <span>
              Time: {Math.floor(timeLeft / 60)} :{" "}
              {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center p-8">
        <div className="play_box bg-purple-500 rounded-xl p-12 w-full max-w-xl">
          <h1 className="text-6xl font-bold select-none text-white mb-8 text-center tracking-wider drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-violet-800">
            Guess the Word
          </h1>
          <div className="word_box bg-purple-400 rounded-lg p-10 mb-8">
            <p className="text-5xl select-none font-bold text-white text-center tracking-widest drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-violet-700">
              {currentWord ? currentWord.scrambled.toUpperCase() : ""}
            </p>
          </div>
          <div className="input_wrapper flex space-x-4">
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Enter your guess"
              className="answer_field flex-grow tracking-wider uppercase text-2xl bg-purple-400 text-white placeholder-purple-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              className="submit_btn tracking-wider ml-8 bg-green-700 text-2xl text-white rounded-full shadow-lg transform transition-transform duration-1000"
              onMouseEnter={playHoverSound}
              onClick={handleSubmit}
            >
              <span className="submit_btn_text bg-gradient-to-br from-green-400 via-green-500 to-green-600 block px-10 py-4 rounded-full -translate-y-1 hover:bg-gradient-to-tl active:-translate-y-0 transition-opacity duration-1000">
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
            className="upload_btn mx-auto mt-10 bg-amber-700 text-2xl text-white rounded-full shadow-lg transform transition-transform duration-1000"
            onMouseEnter={playHoverSound}
            onClick={() => document.getElementById("upload-input").click()}
          >
            <span className="upload_btn_text tracking-wider bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 w-full block px-10 py-4 rounded-full -translate-y-1 hover:bg-gradient-to-tl active:-translate-y-0 transition-opacity duration-1000 inline-flex items-center">
              <RiFileUploadFill alt="Upload" className="w-7 h-7 mr-2" />
              Word File
            </span>
          </button>
        </label>
      </div>

      <MenuModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </PlayScreenWrapper>
  );
};

export default PlayScreen;
