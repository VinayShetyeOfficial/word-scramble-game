// import LeaderboardWrapper from "./LeaderboardWrapper";
// import React, { useContext, useEffect, useState } from "react";
// import { GameContext } from "../../contexts/GameContext";

// const Leaderboard = () => {
//   const { topScores } = useContext(GameContext);
//   const [scores, setScores] = useState([]);

//   useEffect(() => {
//     setScores(topScores);
//   }, [topScores]);

//   return (
//     <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-600 to-yellow-700">
//       <h1 className="mb-8 text-5xl font-bold text-white">Leaderboard</h1>
//       <ul className="text-3xl text-white">
//         {scores.map((score, index) => (
//           <li key={index} className="mb-2">
//             {score.name}: {score.points}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Leaderboard;
import React from "react";

const Leaderboard = () => {
  return <div></div>;
};

export default Leaderboard;
