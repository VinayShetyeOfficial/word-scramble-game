// src/contexts/GameContext.jsx

import React, { createContext, useState, useContext } from "react";
import { categorizeWords, getWordForRound } from "../utils/wordUtils";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameMode, setGameMode] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState(null);
  const [userWords, setUserWords] = useState({});
  const [gameWords, setGameWords] = useState({});

  const startNewRound = () => {
    const { word, scrambled } = getWordForRound(round, userWords, gameWords);
    setCurrentWord({ original: word, scrambled });
    setRound((prevRound) => prevRound + 1);
  };

  const submitGuess = (guess) => {
    if (guess.toLowerCase() === currentWord.original.toLowerCase()) {
      setScore((prevScore) => prevScore + currentWord.original.length);
      return true;
    }
    return false;
  };

  const uploadWords = (words) => {
    const categorized = categorizeWords(words);
    setUserWords((prevWords) => ({
      ...prevWords,
      ...Object.fromEntries(
        Object.entries(categorized).map(([length, words]) => [
          length,
          [...(prevWords[length] || []), ...words],
        ])
      ),
    }));
  };

  return (
    <GameContext.Provider
      value={{
        gameMode,
        setGameMode,
        playerName,
        setPlayerName,
        round,
        score,
        currentWord,
        startNewRound,
        submitGuess,
        uploadWords,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);

export default GameProvider;
