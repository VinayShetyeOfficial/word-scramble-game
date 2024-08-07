import LeaderboardWrapper from "./LeaderboardWrapper";
import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../../contexts/GameContext";

const Leaderboard = () => {
  const { topScores } = useContext(GameContext);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    setScores(topScores);
  }, [topScores]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-400 via-yellow-600 to-yellow-700">
      <h1 className="text-5xl font-bold text-white mb-8">Leaderboard</h1>
      <ul className="text-3xl text-white">
        {scores.map((score, index) => (
          <li key={index} className="mb-2">
            {score.name}: {score.points}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
