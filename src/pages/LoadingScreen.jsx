import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingScreenWrapper from "./LoadingScreenWrapper";

const LoadingScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { playerName } = location.state || {};

  useEffect(() => {
    if (!playerName) {
      navigate("/");
      return;
    }

    // Get existing players data or initialize
    const players = JSON.parse(localStorage.getItem("players") || "[]");

    // Check if player exists
    let player = players.find((p) => p.player === playerName);

    if (!player) {
      // Only create new player structure for new players
      player = {
        id: Math.random().toString(36).substr(2, 9),
        player: playerName,
        joinedDate: new Date().toISOString(),
        high_score: 0,
        gameProgress: {
          currentRound: 1,
          currentScore: 0,
          currentCategory: 4,
          currentLives: 3,
          wordsCompleted: [],
        },
        custom_words: [],
        default_words: [],
      };
      players.push(player);
      localStorage.setItem("players", JSON.stringify(players));
    }
    // No else block - we don't reset existing player's progress

    // Store current player's ID as reference
    localStorage.setItem("currentPlayerId", player.id);

    const timer = setTimeout(() => {
      navigate("/playScreen");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, playerName]);

  // Get player data to check if returning user
  const players = JSON.parse(localStorage.getItem("players") || "[]");
  const isReturningUser = players.some((p) => p.player === playerName);

  return (
    <LoadingScreenWrapper className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-400 via-blue-600 to-blue-800">
      <div className="container p-4 text-center select-none sm:p-6 md:p-8 lg:p-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 md:mb-5 lg:mb-8 tracking-widest drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-blue-800">
          <span className="block sm:inline">
            {isReturningUser ? "Welcome back" : "Welcome"}
          </span>
          <span className="block sm:inline sm:ml-3">{playerName}!</span>
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-3xl text-white tracking-wider drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-blue-900">
          Your game will start soon
          <span className="ml-2 dot-container sm:ml-3">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </span>
        </p>
      </div>
    </LoadingScreenWrapper>
  );
};

export default LoadingScreen;
