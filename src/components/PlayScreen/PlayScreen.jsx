import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlayScreenWrapper from "./PlayScreenWrapper";
import MenuModal from "../MenuModal/MenuModal";
import useSoundEffects from "../../hooks/useSoundEffects";
import { useGame } from "../../contexts/GameContext";
import { FaFileWord } from "react-icons/fa";
import { wordList } from "../../data/words";
import { GamepadIcon, TrophyIcon, ClockIcon } from "../../assets/assets";
import { TfiMenu } from "react-icons/tfi";
import { RiFileUploadFill } from "react-icons/ri";
import {
  playRandomWrongSound,
  playRandomCorrectSound,
} from "../../utils/answerSounds";
import { useMusic } from "../../contexts/MusicContext";

const PlayScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [guess, setGuess] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isInvalid, setIsInvalid] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [showStartButton, setShowStartButton] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const { playHoverSound, playClickSound } = useSoundEffects();
  const {
    round,
    score,
    currentWord,
    startNewRound,
    submitGuess,
    uploadWords,
    setRound,
  } = useGame();
  const { isSoundOn } = useMusic();
  const navigate = useNavigate();

  // Initialize game on mount
  useEffect(() => {
    startNewRound();
  }, []);

  // Timer effect
  useEffect(() => {
    let timer;
    if (!isTimerPaused) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerPaused]);

  // Reset timer when starting new round
  useEffect(() => {
    setTimeLeft(60);
  }, [round]);

  const handleSubmit = () => {
    if (isSoundOn) playClickSound();
    if (submitGuess(guess)) {
      if (isSoundOn) playRandomCorrectSound();
      setGuess("");
      startNewRound(); // Immediately start a new round
      setTimeLeft(60); // Reset timer immediately
    } else {
      if (isSoundOn) playRandomWrongSound();
      setIsInvalid(true);
      setTimeout(() => setIsInvalid(false), 820);
    }
  };

  const handleMenuClick = () => {
    if (isSoundOn) playClickSound();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleSound = () => {
    setSoundOn(!soundOn);
  };

  // Handle file upload
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const lines = content.split(/\r?\n/);
        const isValidCSV = lines.some((line) => line.includes(","));

        if (isValidCSV) {
          const words = lines
            .join(",") // Join all lines to handle single-line CSV
            .split(",")
            .map((word) => word.trim())
            .filter((word) => word !== "");
          uploadWords(words);
          setUploadStatus("uploaded");
          setTimeout(() => {
            setUploadStatus("");
            setShowStartButton(true);
            setIsTimerPaused(true);
          }, 1500);
        } else {
          setUploadStatus("invalid");
          setTimeout(() => setUploadStatus(""), 1500);
        }
      };
      reader.readAsText(file);
    } else {
      setUploadStatus("invalid");
      setTimeout(() => setUploadStatus(""), 1500);
    }
  };

  const handleStartGame = () => {
    setRound("∞"); // Set round to infinity
    setTimeLeft(0); // Reset timer to 0
    startNewRound(); // Start a new round with user words
    setShowStartButton(false); // Hide start button and show upload button
    setIsTimerPaused(false);
  };

  return (
    <PlayScreenWrapper className="flex flex-col min-h-screen bg-purple-700 select-none">
      {/* Header */}
      <div className="flex justify-between items-center p-2 text-white bg-transparent select-none navbar sm:p-3 md:p-4">
        <button
          className="text-xl tracking-wider text-white bg-amber-700 rounded-none shadow-lg menu_btn sm:text-2xl sm:rounded-full"
          onClick={handleMenuClick}
          onMouseEnter={soundOn ? playHoverSound : null}
        >
          <span className="inline-flex items-center px-3 py-2 w-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-none -translate-y-1 menu_btn_text sm:px-6 md:px-8 sm:py-4 sm:rounded-full hover:bg-gradient-to-tl active:-translate-y-0">
            <TfiMenu className="w-5 h-5 menu_btn_icon sm:w-7 sm:h-7 md:w-8 md:h-8" />
            <span className="hidden ml-2 btn_label sm:inline">Menu</span>
          </span>
        </button>
        <div className="flex items-center justify-between px-0.5 py-2 text-xl game_bar sm:px-4 md:px-6 sm:py-3 md:py-4 sm:text-md md:text-xl lg:text-2xl">
          <div className="flex items-center justify-center whitespace-nowrap pr-3 border-r border-purple-300/50 drop-shadow-[2px_2px_0px_var(--tw-shadow-color)] sm:pr-4 md:pr-6 sm:drop-shadow-[3px_2px_0px_var(--tw-shadow-color)] shadow-violet-900">
            <img
              src={GamepadIcon}
              alt="Gamepad"
              className="w-4 h-4 mr-0.5 game_bar_icon sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 sm:mr-2"
            />
            <span className="min-w-[50px] text-center sm:min-w-[90px] md:min-w-[110px] lg:min-w-[130px]">
              <span className="label">Round:</span> {round}
            </span>
          </div>
          <div className="flex items-center justify-center whitespace-nowrap px-3 border-r border-purple-300/50 drop-shadow-[2px_2px_0px_var(--tw-shadow-color)] sm:px-4 md:px-6 sm:drop-shadow-[3px_2px_0px_var(--tw-shadow-color)] shadow-violet-900">
            <img
              src={TrophyIcon}
              alt="Trophy"
              className="w-4 h-4 mr-0.5 game_bar_icon sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 sm:mr-2"
            />
            <span className="min-w-[50px] text-center sm:min-w-[90px] md:min-w-[110px] lg:min-w-[130px]">
              <span className="label">Score:</span> {score}
            </span>
          </div>
          <div className="flex items-center justify-center whitespace-nowrap pl-3 drop-shadow-[2px_2px_0px_var(--tw-shadow-color)] sm:pl-4 md:pl-6 sm:drop-shadow-[3px_2px_0px_var(--tw-shadow-color)] shadow-violet-900">
            <img
              src={ClockIcon}
              alt="Clock"
              className="w-4 h-4 mr-0.5 game_bar_icon sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 sm:mr-2"
            />
            <span className="min-w-[50px] text-center sm:min-w-[90px] md:min-w-[110px] lg:min-w-[130px]">
              <span className="sm:inline label">Time: </span>
              <span className="timer inline-block min-w-[32px] text-right">
                {Math.floor(timeLeft / 60)}:
                {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow justify-center items-center p-4 select-none playscreen_main sm:p-1 md:p-8">
        <div className="p-6 w-full max-w-xl bg-purple-500 rounded-xl select-none word_box_container play_box sm:p-8 md:p-12">
          <h1 className="play_box_heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold select-none text-white mb-4 sm:mb-6 md:mb-8 text-center tracking-wider drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-violet-800">
            Guess the Word
          </h1>
          <div className="p-6 mb-4 bg-purple-400 rounded-lg select-none word_box sm:p-8 md:p-10 sm:mb-6 md:mb-8">
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center tracking-widest drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-violet-700 select-none">
              {!transitioning && currentWord
                ? currentWord.scrambled.toUpperCase()
                : ""}
            </p>
          </div>
          <div className="flex flex-col space-y-4 input_wrapper sm:flex-row sm:space-x-4 sm:space-y-0">
            <input
              type="text"
              value={guess}
              onChange={(e) => {
                // Only allow letters (no numbers or special characters)
                const value = e.target.value.replace(/[^a-zA-Z]/g, "");
                setGuess(value);
              }}
              onKeyPress={(e) =>
                e.key === "Enter" && guess.trim() && handleSubmit()
              }
              placeholder={`Enter ${
                currentWord ? currentWord.scrambled.length : ""
              } letters`}
              maxLength={currentWord ? currentWord.scrambled.length : 0}
              className={`p-3 w-full text-lg tracking-wider placeholder-purple-200 
                text-white uppercase bg-purple-400 rounded-lg answer_field 
                sm:text-xl md:text-2xl sm:p-4 focus:outline-none focus:ring-2 
                focus:ring-purple-600 ${isInvalid ? "invalid" : ""}`}
            />
            <button
              className={`mx-auto text-lg tracking-wider text-white rounded-full shadow-lg submit_btn sm:text-xl md:text-2xl sm:mx-0 select-none
                ${
                  guess.trim()
                    ? "bg-green-700 hover:bg-green-600 cursor-pointer"
                    : "bg-green-800 cursor-not-allowed opacity-75"
                }`}
              onMouseEnter={() => guess.trim() && soundOn && playHoverSound()}
              onClick={() => guess.trim() && handleSubmit()}
              disabled={!guess.trim()}
            >
              <span
                className={`block px-6 py-3 rounded-full -translate-y-1 submit_btn_text 
                sm:px-8 md:px-10 sm:py-4 hover:bg-gradient-to-tl active:-translate-y-0 select-none
                ${
                  guess.trim()
                    ? "bg-gradient-to-br from-green-400 via-green-500 to-green-600"
                    : "bg-gradient-to-br from-green-600 via-green-700 to-green-800"
                }`}
              >
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
        <label htmlFor="upload-input" className="select-none">
          {!showStartButton && (
            <button
              className={`mx-auto mt-6 text-lg text-white rounded-full shadow-lg select-none upload_btn sm:mt-8 md:mt-10 sm:text-xl md:text-2xl
                ${uploadStatus === "uploaded" ? "bg-green-700" : ""}
                ${uploadStatus === "invalid" ? "bg-red-500" : "bg-amber-700"}`}
              onMouseEnter={isSoundOn ? playHoverSound : null}
              onClick={() => document.getElementById("upload-input").click()}
            >
              <span
                className={`block inline-flex items-center px-6 py-3 w-full tracking-wider rounded-full -translate-y-1 select-none upload_btn_text sm:px-8 md:px-10 sm:py-4 hover:bg-gradient-to-tl active:-translate-y-0
                ${
                  uploadStatus === "uploaded"
                    ? "bg-gradient-to-br from-green-400 via-green-500 to-green-600"
                    : ""
                }
                ${
                  uploadStatus === "invalid"
                    ? "bg-gradient-to-br from-red-400 via-red-500 to-red-600"
                    : "bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600"
                }`}
              >
                <RiFileUploadFill className="mr-2 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                {uploadStatus === "uploaded"
                  ? "Uploaded"
                  : uploadStatus === "invalid"
                  ? "Invalid!"
                  : "Upload File"}
              </span>
            </button>
          )}
        </label>

        {showStartButton && (
          <button
            className="mx-auto mt-6 text-lg text-white bg-green-700 rounded-full shadow-lg select-none start_btn sm:mt-8 md:mt-10 sm:text-xl md:text-2xl"
            onClick={handleStartGame}
          >
            <span className="block inline-flex items-center px-6 py-3 w-full tracking-wider bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full -translate-y-1 select-none start_btn_text sm:px-8 md:px-10 sm:py-4 hover:bg-gradient-to-tl active:-translate-y-0">
              <FaFileWord className="mr-2 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
              Start Game
            </span>
          </button>
        )}
      </div>

      {/* Menu Modal */}
      <MenuModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        soundOn={soundOn}
        onSoundToggle={toggleSound}
      />
    </PlayScreenWrapper>
  );
};

export default PlayScreen;
