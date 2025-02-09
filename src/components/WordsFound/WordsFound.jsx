import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import WordsFoundWrapper from "./WordsFoundWrapper";
import { motion } from "framer-motion";
import { useGame } from "../../contexts/GameContext"; // Importing useGame from context

const WordPill = ({ word }) => {
  return (
    <motion.span
      className="px-3 py-1 text-sm font-normal text-white bg-blue-500 rounded-full"
      animate={{
        y: [0, -4, 0], // Move up and down
        rotate: [-1, 1, -1], // Slight rotation
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 2, // Random delay for each pill to create water-like effect
      }}
    >
      {word}
    </motion.span>
  );
};

const WordsFound = ({ onClose }) => {
  const { usedWords } = useGame(); // Using usedWords from GameContext to re-run the effect when words update
  const [wordsFound, setWordsFound] = useState({
    defaultWords: [],
    customWords: [],
  });

  useEffect(() => {
    const currentPlayerId = localStorage.getItem("currentPlayerId");
    if (currentPlayerId) {
      const players = JSON.parse(localStorage.getItem("players") || "[]");
      const player = players.find((p) => p.id === currentPlayerId);
      if (player) {
        setWordsFound({
          defaultWords: player.default_words || [],
          customWords: player.custom_words || [],
        });
      }
    }
  }, [usedWords]);

  return (
    <WordsFoundWrapper>
      <div className="words_found_modal mx-auto relative bg-white p-8 rounded-lg shadow-lg max-w-md w-full min-h-[400px] max-h-[500px] overflow-hidden z-70">
        <button
          onClick={onClose}
          className="flex absolute top-0 right-0 justify-center items-center w-12 h-12 text-gray-500 close_words_found_btn hover:text-red-600"
        >
          <IoClose className="w-8 h-8" />
        </button>

        <h3 className="mb-6 text-3xl font-bold tracking-wider text-center text-purple-700 words_found_heading">
          Words Found
        </h3>

        <div className="words_found_items overflow-y-auto h-[calc(100%-80px)] mask-fade-bottom pr-2">
          <div className="flex flex-col items-start mb-4 space-y-2">
            <h4 className="font-sans text-lg italic font-semibold tracking-wide text-gray-700">
              Default Words
            </h4>
            <div className="flex flex-wrap gap-2 w-full">
              {wordsFound.defaultWords.map((word, index) => (
                <WordPill key={index} word={word} />
              ))}
              {wordsFound.defaultWords.length === 0 && (
                <span className="italic text-gray-500">No words found yet</span>
              )}
            </div>
          </div>

          {wordsFound.customWords.length > 0 && (
            <div className="flex flex-col items-start mb-4 space-y-2">
              <h4 className="font-sans text-lg italic font-semibold tracking-wide text-gray-700">
                Custom Words
              </h4>
              <div className="flex flex-wrap gap-2 w-full">
                {wordsFound.customWords.map((word, index) => (
                  <WordPill key={index} word={word} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </WordsFoundWrapper>
  );
};

export default WordsFound;
