import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlayScreenWrapper from "./PlayScreenWrapper";
import MenuModal from "../MenuModal/MenuModal";
import useSoundEffects from "../../hooks/useSoundEffects";
import { useGame } from "../../contexts/GameContext";
import { FaFileWord } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { wordList } from "../../data/words";
import { HeartIcon } from "../../assets/assets";
import { GamepadIcon, TrophyIcon, ClockIcon } from "../../assets/assets";
import { TfiMenu } from "react-icons/tfi";
import { RiFileUploadFill } from "react-icons/ri";
import {
  playRandomWrongSound,
  playRandomCorrectSound,
} from "../../utils/answerSounds";
import { useMusic } from "../../contexts/MusicContext";
import { validateWords } from "../../utils/wordValidator";

const PlayScreen = () => {
  // [Previous state declarations remain the same]
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [guess, setGuess] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isInvalid, setIsInvalid] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [showStartButton, setShowStartButton] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [validationStatus, setValidationStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lives, setLives] = useState(3);
  const [isMounted, setIsMounted] = useState(false);

  // Add this ref near other state declarations
  const isReducingLife = React.useRef(false);

  // [Previous hooks and context remain the same]
  const { playHoverSound, playClickSound } = useSoundEffects();
  const {
    round,
    score,
    currentWord,
    startNewRound,
    submitGuess,
    uploadWords,
    setRound,
    setScore,
    userWords,
  } = useGame();
  const { isSoundOn } = useMusic();
  const navigate = useNavigate();

  // Remove the useLayoutEffect initialization
  useEffect(() => {
    if (!currentWord) {
      startNewRound();
      setTimeLeft(10);
    }
  }, []); // Run once on mount

  // Updated Timer effect with improved lives handling
  useEffect(() => {
    let timer;
    if (!isTimerPaused) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1 && !isReducingLife.current) {
            // When time runs out, only log the answer
            console.log("Time's up! Current word:", currentWord?.original);

            isReducingLife.current = true;
            // Reduce lives first
            setLives((prevLives) => {
              const newLives = prevLives - 1;
              if (newLives > 0) {
                // Only start new round after lives are reduced
                setTimeout(() => {
                  startNewRound();
                  setTimeLeft(10);
                  setGuess("");
                  isReducingLife.current = false;
                }, 0);
              } else {
                setIsTimerPaused(true);
                isReducingLife.current = false;
              }
              return newLives;
            });

            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(timer);
      isReducingLife.current = false;
    };
  }, [isTimerPaused, currentWord]);

  // Updated renderHearts function to reduce from left to right
  const renderHearts = () => {
    return Array(3)
      .fill(null)
      .map((_, index) => (
        <img
          key={index}
          src={HeartIcon}
          alt="Heart"
          className={`game-life-icon ${index >= lives ? "lost" : ""}`}
          style={{
            opacity: index >= lives ? 0.4 : 1,
            transition: "opacity 0.3s ease",
          }}
        />
      ));
  };

  // Reset timer when starting new round
  useEffect(() => {
    setTimeLeft(10);
  }, [round]);

  const handleSubmit = () => {
    if (isSoundOn) playClickSound();
    if (submitGuess(guess)) {
      if (isSoundOn) playRandomCorrectSound();
      setGuess("");
      startNewRound(); // Immediately start a new round
      setTimeLeft(10); // Changed from 60 to 10
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

  // Add the file processing logic
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsProcessing(true);
    setValidationStatus("validating");

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target.result.trim();
        console.log("Raw file content:", text);

        // Split into words
        const rawWords = text
          .split(/[,\s\n]+/)
          .map((word) => word.trim().toLowerCase())
          .filter((word) => word.length > 0);

        console.log("Raw words:", rawWords);

        // Set validating status with timeout
        setUploadStatus("validating");

        // Add artificial delay for validation status
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Validate words
        const { validWords, invalidWords, rejectedWords } = await validateWords(
          rawWords
        );

        // Log validation results
        console.log("Validation Results:", {
          valid: validWords,
          invalid: invalidWords,
          rejected: rejectedWords,
        });

        setValidationStatus({
          valid: validWords.length,
          invalid: invalidWords.length,
          rejected: rejectedWords.length,
        });

        if (validWords.length === 0) {
          setUploadStatus("invalid");
          setTimeout(() => {
            setUploadStatus("");
            setValidationStatus(null);
            setIsProcessing(false);
          }, 1500);
          return;
        }

        // Process valid words
        const processedWords = validWords.map((word) => ({
          original: word.toUpperCase(),
          scrambled: word
            .toUpperCase()
            .split("")
            .sort(() => Math.random() - 0.5)
            .join(""),
        }));

        // Upload processed words
        const success = await uploadWords(processedWords);

        if (success) {
          setUploadStatus("uploaded");
          setIsTimerPaused(true);
          event.target.value = ""; // Clear the file input
          const inputElement = document.querySelector('input[type="text"]');
          if (inputElement) {
            inputElement.disabled = true;
            inputElement.placeholder = "Custom words loaded...";
          }
          setTimeout(() => {
            setUploadStatus("");
            setShowStartButton(true);
            setValidationStatus(null);
            setIsProcessing(false);
          }, 1500);
        } else {
          setUploadStatus("error");
          setTimeout(() => setUploadStatus(""), 1500);
        }
      } catch (error) {
        console.error("Error processing file:", error);
        setUploadStatus("error");
        setTimeout(() => setUploadStatus(""), 1500);
      }
    };

    reader.onerror = () => {
      setUploadStatus("invalid");
      setTimeout(() => {
        setUploadStatus("");
        setIsProcessing(false);
      }, 1500);
    };

    reader.readAsText(file);
  };

  // Update the button text based on status
  const getButtonText = () => {
    switch (uploadStatus) {
      case "validating":
        return "Validating...";
      case "uploaded":
        return "Uploaded!";
      case "invalid":
        return "Invalid!";
      default:
        return "Upload File";
    }
  };

  const handleStartGame = () => {
    setShowStartButton(false);
    setTimeLeft(10);
    setScore(0);
    setLives(3); // Reset lives to 3
    setIsTimerPaused(false);

    // Set round to infinite only when starting game with custom words
    if (Object.keys(userWords).length > 0) {
      setRound("∞");
    } else {
      setRound(1); // Reset to 1 for default word list
    }

    startNewRound();

    // Re-enable the input when game starts
    const inputElement = document.querySelector('input[type="text"]');
    if (inputElement) {
      inputElement.disabled = false;
      inputElement.placeholder = "Type your guess here...";
    }
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
          <div className="flex justify-center items-center pr-3 whitespace-nowrap border-r border-purple-300/50">
            <img
              src={GamepadIcon}
              alt="Gamepad"
              className="w-4 h-4 mr-0.5 game_bar_icon sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 sm:mr-2"
            />
            <span className="min-w-[50px] text-center sm:min-w-[90px] md:min-w-[110px] lg:min-w-[130px]">
              <span className="label">Round:</span> {round}
            </span>
          </div>
          <div className="flex justify-center items-center px-3 whitespace-nowrap border-r border-purple-300/50">
            <img
              src={TrophyIcon}
              alt="Trophy"
              className="w-4 h-4 mr-0.5 game_bar_icon sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 sm:mr-2"
            />
            <span className="min-w-[50px] text-center sm:min-w-[90px] md:min-w-[110px] lg:min-w-[130px]">
              <span className="label">Score:</span> {score}
            </span>
          </div>
          <div className="flex justify-center items-center pl-3 whitespace-nowrap">
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
            <div className="game-lives">{renderHearts()}</div>

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
              placeholder={
                uploadStatus === "uploaded"
                  ? "Custom words loaded..."
                  : "Type your guess here..."
              }
              maxLength={currentWord ? currentWord.scrambled.length : 0}
              className={`p-3 w-full text-lg tracking-wider placeholder-purple-200 
                text-white uppercase bg-purple-400 rounded-lg answer_field 
                sm:text-xl md:text-2xl sm:p-4 focus:outline-none focus:ring-2 
                focus:ring-purple-600 ${isInvalid ? "invalid" : ""} ${
                uploadStatus === "uploaded" ? "disabled" : ""
              }`}
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
              disabled={!guess.trim() || uploadStatus === "uploaded"}
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
          disabled={isProcessing}
        />
        <label htmlFor="upload-input" className="select-none">
          {!showStartButton && (
            <button
              className={`mx-auto mt-6 text-lg text-white rounded-full shadow-lg select-none upload_btn sm:mt-8 md:mt-10 sm:text-xl md:text-2xl
                ${uploadStatus === "uploaded" ? "bg-green-700" : ""}
                ${uploadStatus === "invalid" ? "bg-red-500" : "bg-amber-700"}
                ${isProcessing ? "cursor-not-allowed opacity-75" : ""}`}
              onMouseEnter={!isProcessing && isSoundOn ? playHoverSound : null}
              onClick={(e) => {
                if (isProcessing) {
                  e.preventDefault();
                  return;
                }
                document.getElementById("upload-input").click();
              }}
            >
              <span
                className={`block inline-flex items-center px-6 py-3 w-full tracking-wider rounded-full -translate-y-1 select-none upload_btn_text sm:px-8 md:px-10 sm:py-4 
                  ${
                    !isProcessing
                      ? "hover:bg-gradient-to-tl active:-translate-y-0"
                      : ""
                  }
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
                {getButtonText()}
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
