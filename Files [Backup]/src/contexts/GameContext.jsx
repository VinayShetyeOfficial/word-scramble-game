import React, { createContext, useState } from "react";

export const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [gameMode, setGameMode] = useState(null);
  const [playerName, setPlayerName] = useState("");
  // Add other state variables and functions as needed

  return (
    <GameContext.Provider
      value={{ gameMode, setGameMode, playerName, setPlayerName }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
