import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import MenuModalWrapper from "./MenuModalWrapper";
import { CloseIcon } from "../../assets/assets";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import { PiInfoFill } from "react-icons/pi";
import { IoCheckmarkCircle } from "react-icons/io5";
import { FaLightbulb, FaFileUpload } from "react-icons/fa";
import { RxLapTimer } from "react-icons/rx";
import { MdLeaderboard } from "react-icons/md";
import useSoundEffects from "../../hooks/useSoundEffects";
import { useMusic } from "../../contexts/MusicContext"; // Added MusicContext import
import { motion, AnimatePresence } from "framer-motion";
import WordsFound from "../WordsFound/WordsFound";

const MenuModal = ({ isOpen, onClose }) => {
  const { isMusicOn, isSoundOn, toggleMusic, toggleSound } = useMusic(); // Using MusicContext
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isWordsFoundOpen, setIsWordsFoundOpen] = useState(false);
  const { playHoverSound, playClickSound } = useSoundEffects();

  useEffect(() => {
    // Added effect for music state logging
    console.log("Music state changed:", isMusicOn);
  }, [isMusicOn]);

  if (!isOpen) return null;

  const handleToggleMusic = () => {
    playClickSound();
    toggleMusic();
  };

  const handleToggleSound = () => {
    playClickSound();
    toggleSound();
  };

  const openHelp = () => {
    playClickSound();
    setIsHelpOpen(true);
  };

  const closeHelp = () => {
    playClickSound();
    setIsHelpOpen(false);
  };

  const openWordsFound = () => {
    playClickSound();
    setIsWordsFoundOpen(true);
  };

  const closeWordsFound = () => {
    playClickSound();
    setIsWordsFoundOpen(false);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <MenuModalWrapper className="flex fixed inset-0 z-50 justify-center items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900"
            onClick={onClose}
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-50 p-16 w-full max-w-xl bg-purple-700 rounded-2xl shadow-lg select-none modal_box"
          >
            <div className="flex justify-between items-center mb-6 modal_box_wrapper">
              <h2 className="text-4xl font-bold text-center flex-grow text-white drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-violet-900">
                Menu
              </h2>
              <button
                onClick={() => {
                  playClickSound();
                  onClose();
                }}
                onMouseEnter={playHoverSound}
                className="absolute top-4 right-4"
              >
                <img
                  src={CloseIcon}
                  alt="Close"
                  className="w-14 h-14 rounded-full btn-close"
                />
              </button>
            </div>
            <div className="flex flex-col space-y-4 text-xl btn_wrapper">
              <button
                className="modal-btn tracking-wider bg-green-700 text-2xl mx-auto text-white rounded-full shadow-lg transform transition-transform duration-1000 w-full max-w-[280px]"
                onClick={handleToggleSound}
                onMouseEnter={playHoverSound}
              >
                <span className="block inline-flex justify-center items-center px-10 py-4 w-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full -translate-y-1 modal-btn-text hover:bg-gradient-to-tl active:-translate-y-0">
                  {isSoundOn ? "Sound On" : "Sound Off"}
                  {isSoundOn ? (
                    <HiMiniSpeakerWave className="ml-2 w-8 h-8 icon" />
                  ) : (
                    <HiMiniSpeakerXMark className="ml-2 w-8 h-8 text-green-800 icon" />
                  )}
                </span>
              </button>
              <button
                className="modal-btn tracking-wider bg-green-700 text-2xl mx-auto text-white rounded-full shadow-lg transform transition-transform duration-1000 w-full max-w-[280px]"
                onClick={handleToggleMusic}
                onMouseEnter={playHoverSound}
              >
                <span className="block inline-flex justify-center items-center px-10 py-4 w-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full -translate-y-1 modal-btn-text hover:bg-gradient-to-tl active:-translate-y-0">
                  {isMusicOn ? "Music On" : "Music Off"}
                  {isMusicOn ? (
                    <HiMiniSpeakerWave className="ml-2 w-8 h-8 icon" />
                  ) : (
                    <HiMiniSpeakerXMark className="ml-2 w-8 h-8 text-green-800 icon" />
                  )}
                </span>
              </button>
              <button
                className="modal-btn tracking-wider bg-green-700 text-2xl mx-auto text-white rounded-full shadow-lg transform transition-transform duration-1000 w-full max-w-[280px]"
                onClick={openHelp}
                onMouseEnter={playHoverSound}
              >
                <span className="block inline-flex justify-center items-center px-10 py-4 w-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full -translate-y-1 modal-btn-text hover:bg-gradient-to-tl active:-translate-y-0">
                  Help <PiInfoFill className="ml-2 w-8 h-8 icon" />
                </span>
              </button>
              <button
                className="modal-btn tracking-wider bg-green-700 text-2xl mx-auto text-white rounded-full shadow-lg transform transition-transform duration-1000 w-full max-w-[280px]"
                onClick={openWordsFound}
                onMouseEnter={playHoverSound}
              >
                <span className="block inline-flex justify-center items-center px-10 py-4 w-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full -translate-y-1 modal-btn-text hover:bg-gradient-to-tl active:-translate-y-0">
                  Words Found{" "}
                  <IoCheckmarkCircle className="ml-2 w-8 h-8 icon" />
                </span>
              </button>
              <button
                className="modal-btn tracking-wider bg-green-700 text-2xl mx-auto text-white rounded-full shadow-lg transform transition-transform duration-1000 w-full max-w-[280px]"
                onClick={() => {
                  playClickSound();
                  onClose();
                }}
                onMouseEnter={playHoverSound}
              >
                <span className="block inline-flex justify-center items-center px-10 py-4 w-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full -translate-y-1 modal-btn-text hover:bg-gradient-to-tl active:-translate-y-0">
                  Quit
                </span>
              </button>
            </div>
            {isHelpOpen && (
              <div className="flex fixed inset-0 justify-center items-center z-60">
                <div
                  className="fixed inset-0 opacity-50 bg-slate-900"
                  onClick={closeHelp}
                ></div>
                <div className="help_modal relative bg-white p-8 rounded-lg shadow-lg max-w-md w-full max-h-[58vh] overflow-hidden z-70">
                  <button
                    onClick={closeHelp}
                    onMouseEnter={playHoverSound}
                    className="flex absolute top-0 right-0 justify-center items-center w-12 h-12 text-gray-500 close_help_btn hover:text-red-600"
                  >
                    <IoClose className="w-8 h-8" />
                  </button>
                  <h3 className="mb-6 text-3xl font-bold tracking-wider text-center text-purple-700 help_heading">
                    Game Instructions
                  </h3>
                  <div className="overflow-y-auto space-y-4 modal_items mask-fade-bottom">
                    <div className="flex items-start mb-4 space-x-2 space-x-4 modal_item item_1">
                      <RxLapTimer className="w-20 h-6 text-green-500 modal_icon icon_1" />
                      <p className="font-sans text-lg font-normal tracking-wide leading-5">
                        <strong className="text-green-600">
                          Timed Rounds:
                        </strong>{" "}
                        Each round of the game has a timer. Guess the scrambled
                        words before time runs out!
                      </p>
                    </div>
                    <div className="flex items-start mb-4 space-x-2 space-x-4 modal_item item_2">
                      <FaFileUpload className="w-20 h-6 text-blue-500 modal_icon icon_2" />
                      <p className="font-sans text-lg font-normal tracking-wide leading-5">
                        <strong className="text-blue-600">Upload Words:</strong>{" "}
                        You can upload a text file (*.txt) with your own set of
                        words separated by commas or spaces.
                      </p>
                    </div>
                    <div className="flex items-start mb-4 space-x-2 space-x-4 modal_item item_3">
                      <FaLightbulb className="w-20 h-6 text-yellow-500 modal_icon icon_3" />
                      <p className="font-sans text-lg font-normal tracking-wide leading-5">
                        <strong className="text-yellow-600">Hints:</strong> Use
                        hints if you get stuck. Each hint will reveal one letter
                        of the word.
                      </p>
                    </div>
                    <div className="flex items-start mb-4 space-x-2 space-x-4 modal_item item_4">
                      <MdLeaderboard className="w-20 h-6 text-red-500 modal_icon icon_4" />
                      <p className="font-sans text-lg font-normal tracking-wide leading-5">
                        <strong className="text-red-600">Leaderboard:</strong>{" "}
                        Check out the top players on the leaderboard. Aim for
                        the highest score!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {isWordsFoundOpen && (
              <div className="flex fixed inset-0 justify-center items-center z-60">
                <div
                  className="fixed inset-0 opacity-50 bg-slate-900"
                  onClick={closeWordsFound}
                ></div>
                <WordsFound onClose={closeWordsFound} />
              </div>
            )}
          </motion.div>
        </MenuModalWrapper>
      )}
    </AnimatePresence>
  );
};

export default MenuModal;
