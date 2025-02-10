import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { FaMedal, FaCrown } from "react-icons/fa";
import { GiPodium } from "react-icons/gi";
import { BiSolidMedal } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { LeaderTrophyIcon } from "../../assets/assets";
import LeaderboardWrapper from "./LeaderboardWrapper";

const Leaderboard = ({ isOpen, onClose }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem("players") || "[]");
    const sortedPlayers = storedPlayers.sort(
      (a, b) => b.high_score - a.high_score
    );
    setPlayers(sortedPlayers);
  }, [isOpen]);

  const getRankIcon = (index) => {
    switch (index) {
      case 0:
        return <FaCrown className="w-6 h-6 text-yellow-400" />;
      case 1:
        return <BiSolidMedal className="w-6 h-6 text-slate-400" />;
      case 2:
        return <BiSolidMedal className="w-6 h-6 text-amber-700" />;
      default:
        return <GiPodium className="w-5 h-5 text-purple-500" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <LeaderboardWrapper>
          <motion.div
            initial={{
              scale: 0,
              opacity: 0,
              x: 60,
              y: 60,
              borderRadius: "50%",
            }}
            animate={{
              scale: 1,
              opacity: 1,
              x: 0,
              y: 0,
              borderRadius: "16px",
              width: "400px",
              height: "auto",
              transition: {
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
                opacity: { duration: 0.3 },
                borderRadius: { duration: 0.2, delay: 0.1 },
              },
            }}
            exit={{
              scale: 0,
              opacity: 0,
              x: 60,
              y: 60,
              transition: {
                duration: 0.3,
                ease: [0.4, 0, 1, 1],
                opacity: { duration: 0.2 },
                borderRadius: { delay: 0.2 },
              },
            }}
            style={{
              transformOrigin: "calc(100% + 6px) calc(100% + 6px)",
            }}
            className="leaderboard_modal"
          >
            <motion.button
              onClick={onClose}
              className="close_leaderboard_btn"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { delay: 0.3, duration: 0.2 },
              }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <IoClose className="w-6 h-6" />
            </motion.button>

            <motion.h3
              className="leaderboard_heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.2, duration: 0.3 },
              }}
              exit={{ opacity: 0, y: 10 }}
            >
              <motion.img
                src={LeaderTrophyIcon}
                alt="Trophy"
                className="trophy_icon"
                initial={{ opacity: 0, scale: 0, rotate: -30 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  transition: { delay: 0.3, duration: 0.3 },
                }}
              />
              Champions
            </motion.h3>

            <motion.div
              className="leaderboard_list"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.3, duration: 0.3 },
              }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="list_header"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.4, duration: 0.3 },
                }}
              >
                <span>Rank</span>
                <span>Player</span>
                <span>Score</span>
              </motion.div>

              {players.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: {
                      delay: 0.5 + index * 0.1,
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  }}
                  exit={{
                    opacity: 0,
                    x: -10,
                    transition: { duration: 0.2 },
                  }}
                  className="list_item"
                >
                  <span className={`rank rank_${index + 1}`}>
                    {getRankIcon(index)}#{index + 1}
                  </span>
                  <span className="name">{player.player}</span>
                  <span className="score">
                    {player.high_score}
                    <BsStars className="w-5 h-5 score_icon" />
                  </span>
                </motion.div>
              ))}

              {players.length === 0 && (
                <motion.div
                  className="empty_state"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { delay: 0.4, duration: 0.3 },
                  }}
                >
                  <GiPodium className="w-14 h-14 text-purple-600 opacity-50" />
                  No players yet
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </LeaderboardWrapper>
      )}
    </AnimatePresence>
  );
};

export default Leaderboard;
