import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlayScreenWrapper from "./PlayScreenWrapper";
import MenuModal from "../MenuModal/MenuModal";
import useSoundEffects from "../../hooks/useSoundEffects";
import { useGame } from "../../contexts/GameContext";
import { FaFileWord } from "react-icons/fa";
import { HeartIcon } from "../../assets/assets";
import {
  GamepadIcon,
  TrophyIcon,
  ClockIcon,
  LeaderboardIcon,
  LeaderTrophyIcon,
  GameOverSound,
  LifeDownSound,
} from "../../assets/assets";
import { TfiMenu } from "react-icons/tfi";
import { RiFileUploadFill } from "react-icons/ri";
import {
  playRandomWrongSound,
  playRandomCorrectSound,
} from "../../utils/answerSounds";
import { useMusic } from "../../contexts/MusicContext";
import { validateWords } from "../../utils/wordValidator";
import { FaPlayCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import CelebrationEffects from "../CelebrationEffects/CelebrationEffects";
import Leaderboard from "../Leaderboard/Leaderboard";

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
  const [validationStatus, setValidationStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lives, setLives] = useState(3);
  const [isMounted, setIsMounted] = useState(false);
  const [celebrationType, setCelebrationType] = useState(null);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  const isReducingLife = React.useRef(false);

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
    resetGame,
    updateLives,
    handleGameOver,
    updateHighScore,
    updateRound,
  } = useGame();

  const { isSoundOn } = useMusic();
  const navigate = useNavigate();

  const gameOverSoundRef = React.useRef(new Audio(GameOverSound));
  const lifeDownSoundRef = React.useRef(new Audio(LifeDownSound));

  useEffect(() => {
    if (!currentWord) {
      startNewRound();
      setTimeLeft(12);
    }
  }, []);

  // Updated timer effect to handle immediate life updates and store missed words
  useEffect(() => {
    let timer;
    if (!isTimerPaused) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1 && !isReducingLife.current) {
            isReducingLife.current = true;
            if (isSoundOn && lives > 1) {
              lifeDownSoundRef.current
                .play()
                .catch((error) =>
                  console.error("Error playing life down sound:", error)
                );
            }

            // Store the missed word immediately
            const currentPlayerId = localStorage.getItem("currentPlayerId");
            const players = JSON.parse(localStorage.getItem("players") || "[]");
            const playerIndex = players.findIndex(
              (p) => p.id === currentPlayerId
            );

            if (
              playerIndex !== -1 &&
              Object.keys(userWords).length === 0 &&
              currentWord
            ) {
              // Add the missed word to wordsCompleted array
              players[playerIndex].gameProgress = {
                ...players[playerIndex].gameProgress,
                wordsCompleted: [
                  ...players[playerIndex].gameProgress.wordsCompleted,
                  currentWord.original,
                ],
                currentLives: lives - 1, // Update lives immediately
              };
              localStorage.setItem("players", JSON.stringify(players));
            }

            setTimeout(() => {
              setLives((prevLives) => {
                const newLives = prevLives - 1;

                if (newLives > 0) {
                  setTimeout(() => {
                    startNewRound();
                    setTimeLeft(12);
                    setGuess("");
                    isReducingLife.current = false;
                  }, 0);
                } else {
                  setIsTimerPaused(true);
                  isReducingLife.current = false;
                  handleGameOver();

                  if (isSoundOn) {
                    gameOverSoundRef.current
                      .play()
                      .catch((error) =>
                        console.error("Error playing game over sound:", error)
                      );
                  }
                }
                return newLives;
              });
            }, 250);
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
  }, [isTimerPaused, currentWord, isSoundOn, lives, handleGameOver, userWords]);

  // Update the initialization effect to run before render
  useLayoutEffect(() => {
    const currentPlayerId = localStorage.getItem("currentPlayerId");
    if (currentPlayerId) {
      const players = JSON.parse(localStorage.getItem("players") || "[]");
      const player = players.find((p) => p.id === currentPlayerId);

      if (player && Object.keys(userWords).length === 0) {
        // Initialize lives from localStorage
        if (player.gameProgress.currentLives !== undefined) {
          setLives(player.gameProgress.currentLives);
        }
      }
    }
  }, []); // Empty dependency array means this runs once on mount

  // Update renderHearts to ensure it uses the correct lives count
  const renderHearts = () => {
    // For custom words mode, use the lives state directly
    if (Object.keys(userWords).length > 0) {
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
              transition: "opacity 0.4s ease 0.1s",
            }}
          />
        ));
    }

    // For default mode, use localStorage
    const currentPlayerId = localStorage.getItem("currentPlayerId");
    const players = JSON.parse(localStorage.getItem("players") || "[]");
    const player = players.find((p) => p.id === currentPlayerId);
    const currentLives = player?.gameProgress?.currentLives ?? lives;

    return Array(3)
      .fill(null)
      .map((_, index) => (
        <img
          key={index}
          src={HeartIcon}
          alt="Heart"
          className={`game-life-icon ${index >= currentLives ? "lost" : ""}`}
          style={{
            opacity: index >= currentLives ? 0.4 : 1,
            transition: "opacity 0.4s ease 0.1s",
          }}
        />
      ));
  };

  useEffect(() => {
    setTimeLeft(12);
  }, [round]);

  const handleSubmit = () => {
    if (isSoundOn) playClickSound();

    if (submitGuess(guess)) {
      if (isSoundOn) playRandomCorrectSound();
      setGuess("");

      // Store the found word in localStorage
      const currentPlayerId = localStorage.getItem("currentPlayerId");
      const players = JSON.parse(localStorage.getItem("players") || "[]");
      const playerIndex = players.findIndex((p) => p.id === currentPlayerId);

      if (playerIndex !== -1) {
        // Determine if it's a custom word or default word
        const isCustomWord = Object.keys(userWords).length > 0;
        const wordList = isCustomWord ? "custom_words" : "default_words";

        // Initialize arrays if they don't exist
        if (!players[playerIndex][wordList]) {
          players[playerIndex][wordList] = [];
        }

        // Add the word if it's not already in the list
        if (!players[playerIndex][wordList].includes(currentWord.original)) {
          players[playerIndex][wordList].push(currentWord.original);
          localStorage.setItem("players", JSON.stringify(players));
        }
      }

      // Update lives in localStorage when submitting correct answer
      if (playerIndex !== -1 && Object.keys(userWords).length === 0) {
        players[playerIndex].gameProgress.currentLives = lives;
        localStorage.setItem("players", JSON.stringify(players));
      }

      const effects = ["confetti", "firework", "stars", "pride"];
      const randomEffect = effects[Math.floor(Math.random() * effects.length)];
      setCelebrationType(randomEffect);
      setIsCelebrating(true);

      setTimeout(() => {
        setIsCelebrating(false);
        setCelebrationType(null);
      }, 3000);

      startNewRound();
      setTimeLeft(12);
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

    // Check file extension
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (fileExtension !== "txt") {
      setUploadStatus("invalid");
      setTimeout(() => setUploadStatus(""), 1200); // Reset after animation
      return;
    }

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
          setGuess(""); // Clear the text input when file upload starts
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

          // Clear previous custom words when new file is uploaded
          localStorage.removeItem("customWordsFound");
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
    setTimeLeft(12);
    setScore(0);

    // Always reset lives and game state when starting custom words game
    setLives(3);

    // Update localStorage with reset game state
    const currentPlayerId = localStorage.getItem("currentPlayerId");
    const players = JSON.parse(localStorage.getItem("players") || "[]");
    const playerIndex = players.findIndex((p) => p.id === currentPlayerId);

    if (playerIndex !== -1) {
      players[playerIndex].gameProgress = {
        ...players[playerIndex].gameProgress,
        currentLives: 3,
        currentScore: 0,
        currentRound: Object.keys(userWords).length > 0 ? "∞" : 1,
      };
      localStorage.setItem("players", JSON.stringify(players));
    }

    setIsTimerPaused(false);
    setRound(Object.keys(userWords).length > 0 ? "∞" : 1);
    startNewRound();

    const inputElement = document.querySelector('input[type="text"]');
    if (inputElement) {
      inputElement.disabled = false;
      inputElement.placeholder = "Type your guess here...";
    }
  };

  // Handle Play Again button click
  const handlePlayAgain = () => {
    if (isSoundOn) playClickSound();
    setLives(3);
    setTimeLeft(12);
    setGuess("");
    setIsTimerPaused(false);
    setUploadStatus("");
    setShowStartButton(false);
    setIsInvalid(false);
    setValidationStatus(null);
    setIsProcessing(false);
    resetGame();
  };

  // Add these animations inside PlayScreen component:
  const wordBoxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
      },
    },
  };

  useEffect(() => {
    const currentPlayerId = localStorage.getItem("currentPlayerId");
    const players = JSON.parse(localStorage.getItem("players") || "[]");
    const currentPlayer = players.find((p) => p.id === currentPlayerId);

    if (!currentPlayer) {
      navigate("/");
      return;
    }

    // Update words found
    const updatePlayerWords = (word, isCustomWord = false) => {
      const players = JSON.parse(localStorage.getItem("players"));
      const playerIndex = players.findIndex((p) => p.id === currentPlayerId);

      if (playerIndex !== -1) {
        const wordList = isCustomWord ? "custom_words" : "default_words";
        if (!players[playerIndex][wordList].includes(word)) {
          players[playerIndex][wordList].push(word);
          localStorage.setItem("players", JSON.stringify(players));
        }
      }
    };

    // Update high score
    const updateHighScore = (newScore) => {
      const players = JSON.parse(localStorage.getItem("players"));
      const playerIndex = players.findIndex((p) => p.id === currentPlayerId);

      if (playerIndex !== -1 && newScore > players[playerIndex].high_score) {
        players[playerIndex].high_score = newScore;
        localStorage.setItem("players", JSON.stringify(players));
      }
    };
  }, []);

  // Add new useEffect to watch round changes
  useEffect(() => {
    if (round !== "∞") {
      // Only update for default game mode
      updateRound(round);
    }
  }, [round, updateRound]);

  return (
    <PlayScreenWrapper className="flex flex-col min-h-screen bg-purple-700 select-none">
      <CelebrationEffects
        type={celebrationType}
        isActive={isCelebrating}
        onComplete={() => setIsCelebrating(false)}
      />
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
          <AnimatePresence mode="wait">
            <motion.div
              key={currentWord?.scrambled}
              variants={wordBoxVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="p-6 mb-4 bg-purple-400 rounded-lg select-none word_box sm:p-8 md:p-10 sm:mb-6 md:mb-8"
            >
              <div className="game-lives">{renderHearts()}</div>

              <div className="flex flex-col justify-center items-center w-full">
                <p className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-violet-800">
                  {lives === 0
                    ? "Game Over"
                    : currentWord
                    ? currentWord.scrambled.toUpperCase()
                    : ""}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex flex-col space-y-4 input_wrapper sm:flex-row sm:space-x-4 sm:space-y-0">
            <input
              type="text"
              value={guess}
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z]/g, "");
                setGuess(value);
              }}
              onKeyPress={(e) =>
                e.key === "Enter" && guess.trim() && handleSubmit()
              }
              placeholder={
                lives === 0
                  ? "ABCDE...✍️"
                  : uploadStatus === "uploaded"
                  ? "Custom words loaded..."
                  : "Type your guess here..."
              }
              maxLength={currentWord ? currentWord.scrambled.length : 0}
              className={`p-3 w-full text-lg tracking-wider placeholder-purple-200 
                text-white uppercase bg-purple-400 rounded-lg answer_field 
                sm:text-xl md:text-2xl sm:p-4 focus:outline-none focus:ring-2 
                focus:ring-purple-600 ${isInvalid ? "invalid" : ""} ${
                uploadStatus === "uploaded" || showStartButton || lives === 0
                  ? "disabled"
                  : ""
              }`}
              disabled={
                uploadStatus === "uploaded" || showStartButton || lives === 0
              }
            />
            <button
              className={`mx-auto text-lg tracking-wider text-white rounded-full shadow-lg submit_btn sm:text-xl md:text-2xl sm:mx-0 select-none
                ${
                  uploadStatus === "uploaded" || showStartButton || lives === 0
                    ? "bg-green-800 cursor-not-allowed opacity-75"
                    : guess.trim()
                    ? "bg-green-700 hover:bg-green-600 cursor-pointer"
                    : "bg-green-800 cursor-not-allowed opacity-75"
                }`}
              onMouseEnter={() => guess.trim() && soundOn && playHoverSound()}
              onClick={() => guess.trim() && handleSubmit()}
              disabled={
                !guess.trim() ||
                uploadStatus === "uploaded" ||
                showStartButton ||
                lives === 0
              }
            >
              <span
                className={`block px-6 py-3 rounded-full -translate-y-1 submit_btn_text 
                  sm:px-8 md:px-10 sm:py-4 hover:bg-gradient-to-tl active:-translate-y-0 select-none
                  ${
                    uploadStatus === "uploaded" || showStartButton
                      ? "bg-gradient-to-br from-green-600 via-green-700 to-green-800"
                      : guess.trim()
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
            <>
              {lives === 0 ? (
                <button
                  className="mx-auto mt-6 text-lg text-white bg-green-700 rounded-full shadow-lg select-none play_again_btn sm:mt-8 md:mt-10 sm:text-xl md:text-2xl"
                  onClick={handlePlayAgain}
                  onMouseEnter={isSoundOn ? playHoverSound : null}
                >
                  <span className="block inline-flex items-center px-6 py-3 w-full tracking-wider bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full -translate-y-1 select-none play_again_btn_text sm:px-8 md:px-10 sm:py-4 hover:bg-gradient-to-tl active:-translate-y-0">
                    <FaPlayCircle className="mr-2 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                    Play Again
                  </span>
                </button>
              ) : uploadStatus !== "invalid" && !isProcessing ? (
                <button
                  className={`mx-auto mt-6 text-lg text-white rounded-full shadow-lg select-none upload_btn sm:mt-8 md:mt-10 sm:text-xl md:text-2xl
            ${uploadStatus === "uploaded" ? "bg-green-700" : "bg-amber-700"}
            ${isProcessing ? "cursor-not-allowed opacity-75" : ""}`}
                  onMouseEnter={isSoundOn ? playHoverSound : null}
                  onClick={() =>
                    document.getElementById("upload-input").click()
                  }
                >
                  <span
                    className={`block inline-flex items-center px-6 py-3 w-full tracking-wider rounded-full -translate-y-1 select-none upload_btn_text sm:px-8 md:px-10 sm:py-4 
              hover:bg-gradient-to-tl active:-translate-y-0
              ${
                uploadStatus === "uploaded"
                  ? "bg-gradient-to-br from-green-400 via-green-500 to-green-600"
                  : isProcessing
                  ? "bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600"
                  : "bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600"
              }`}
                  >
                    <RiFileUploadFill className="mr-2 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                    {getButtonText()}
                  </span>
                </button>
              ) : (
                <button
                  className="mx-auto mt-6 text-lg text-white bg-amber-700 rounded-full shadow-lg opacity-75 cursor-not-allowed select-none upload_btn sm:mt-8 md:mt-10 sm:text-xl md:text-2xl"
                  disabled
                >
                  <span className="block inline-flex items-center px-6 py-3 w-full tracking-wider bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-full -translate-y-1 select-none upload_btn_text sm:px-8 md:px-10 sm:py-4">
                    <RiFileUploadFill className="mr-2 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                    {getButtonText()}
                  </span>
                </button>
              )}
            </>
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

      <div
        className="leaderboard_circle"
        onClick={() => {
          if (isSoundOn) playClickSound();
          setIsLeaderboardOpen(true);
        }}
        onMouseEnter={isSoundOn ? playHoverSound : undefined}
      >
        <img
          src={LeaderboardIcon}
          alt="Leaderboard"
          className="leaderboard_icon"
        />
      </div>

      <Leaderboard
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
      />
    </PlayScreenWrapper>
  );
};

export default PlayScreen;
