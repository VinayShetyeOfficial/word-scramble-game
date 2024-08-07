import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import MenuModalWrapper from "./MenuModalWrapper";
import { CloseIcon } from "../../assets/assets";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import { PiInfoFill } from "react-icons/pi";
import { IoCheckmarkCircle } from "react-icons/io5";
import { FaRegLightbulb, FaFileUpload } from "react-icons/fa";
import { RxLapTimer } from "react-icons/rx";
import { MdUpload } from "react-icons/md";
import useSoundEffects from "../../hooks/useSoundEffects";
import { useMusic } from "../../contexts/MusicContext";

const MenuModal = ({ isOpen, onClose }) => {
  const { isMusicOn, isSoundOn, toggleMusic, toggleSound } = useMusic();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const { playHoverSound, playClickSound } = useSoundEffects();

  useEffect(() => {
    // This effect will run whenever isMusicOn changes
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

  return (
    <MenuModalWrapper className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-slate-900 opacity-70"
        onClick={onClose}
      ></div>
      <div className="modal_box p-16 rounded-2xl shadow-lg z-50 max-w-xl w-full relative bg-purple-700 select-none">
        <div className="modal_box_wrapper flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold text-center flex-grow text-white drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-violet-900">
            Menu
          </h2>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            onMouseEnter={playHoverSound}
            className="absolute right-4 top-4"
          >
            <img
              src={CloseIcon}
              alt="Close"
              className="btn-close rounded-full w-14 h-14"
            />
          </button>
        </div>
        <div className="btn_wrapper flex flex-col space-y-4 text-xl">
          <button
            className="modal-btn tracking-wider bg-green-700 text-2xl mx-auto text-white rounded-full shadow-lg transform transition-transform duration-1000 w-full max-w-[280px]"
            onClick={handleToggleSound}
            onMouseEnter={playHoverSound}
          >
            <span className="modal-btn-text inline-flex justify-center bg-gradient-to-br from-green-400 via-green-500 to-green-600 w-full block px-10 py-4 rounded-full -translate-y-1 hover:bg-gradient-to-tl active:-translate-y-0 transition-opacity duration-1000">
              {isSoundOn ? "Sound On" : "Sound Off"}
              {isSoundOn ? (
                <HiMiniSpeakerWave className="icon w-8 h-8 ml-2" />
              ) : (
                <HiMiniSpeakerXMark className="icon w-8 h-8 ml-2 text-green-800" />
              )}
            </span>
          </button>
          <button
            className="modal-btn tracking-wider bg-green-700 text-2xl mx-auto text-white rounded-full shadow-lg transform transition-transform duration-1000 w-full max-w-[280px]"
            onClick={handleToggleMusic}
            onMouseEnter={playHoverSound}
          >
            <span className="modal-btn-text inline-flex justify-center bg-gradient-to-br from-green-400 via-green-500 to-green-600 w-full block px-10 py-4 rounded-full -translate-y-1 hover:bg-gradient-to-tl active:-translate-y-0 transition-opacity duration-1000">
              {isMusicOn ? "Music On" : "Music Off"}
              {isMusicOn ? (
                <HiMiniSpeakerWave className="icon w-8 h-8 ml-2" />
              ) : (
                <HiMiniSpeakerXMark className="icon w-8 h-8 ml-2 text-green-800" />
              )}
            </span>
          </button>
          <button
            className="modal-btn tracking-wider bg-green-700 text-2xl mx-auto text-white rounded-full shadow-lg transform transition-transform duration-1000 w-full max-w-[280px]"
            onClick={openHelp}
            onMouseEnter={playHoverSound}
          >
            <span className="modal-btn-text inline-flex justify-center bg-gradient-to-br from-green-400 via-green-500 to-green-600 w-full block px-10 py-4 rounded-full -translate-y-1 hover:bg-gradient-to-tl active:-translate-y-0 transition-opacity duration-1000">
              Help <PiInfoFill className="icon w-8 h-8 ml-2" />
            </span>
          </button>
          <button
            className="modal-btn tracking-wider bg-green-700 text-2xl mx-auto text-white rounded-full shadow-lg transform transition-transform duration-1000 w-full max-w-[280px]"
            onClick={playClickSound}
            onMouseEnter={playHoverSound}
          >
            <span className="modal-btn-text inline-flex justify-center bg-gradient-to-br from-green-400 via-green-500 to-green-600 w-full block px-10 py-4 rounded-full -translate-y-1 hover:bg-gradient-to-tl active:-translate-y-0 transition-opacity duration-1000">
              Words Found{" "}
              <IoCheckmarkCircle className="icon w-8 h-8 ml-2 active:text-green-800" />
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
            <span className="modal-btn-text bg-gradient-to-br from-green-400 via-green-500 to-green-600 w-full block px-10 py-4 rounded-full -translate-y-1 hover:bg-gradient-to-tl active:-translate-y-0 transition-opacity duration-1000">
              Quit
            </span>
          </button>
        </div>
        {isHelpOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-60">
            <div
              className="fixed inset-0 bg-slate-900 opacity-50"
              onClick={closeHelp}
            ></div>
            <div className="help_modal relative bg-white p-8 rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto z-70">
              <button
                onClick={closeHelp}
                onMouseEnter={playHoverSound}
                className="absolute top-0 right-0 w-12 h-12 flex items-center justify-center text-gray-500 hover:text-red-600"
              >
                <IoClose className="w-8 h-8" />
              </button>
              <h3 className="text-3xl font-bold mb-4 text-center text-purple-700 tracking-wider">
                Game Instructions
              </h3>
              <div className="modal_items space-y-4">
                <div className="modal_item item_1 flex items-start space-x-4 space-x-2 mb-4">
                  <RxLapTimer className="modal_icon icon_1 text-green-500 w-20 h-6" />
                  <p className="text-lg leading-5 tracking-wide font-sans font-bold">
                    <strong className="text-green-600">Timed Rounds:</strong>{" "}
                    Each round of the game has a timer. Guess the scrambled
                    words before time runs out!
                  </p>
                </div>
                <div className="modal_item item_2 flex items-start space-x-4 space-x-2 mb-4">
                  <FaFileUpload className="modal_icon icon_2 text-blue-500 w-20 h-6" />
                  <p className="text-lg leading-5 tracking-wide font-sans font-bold">
                    <strong className="text-blue-600">Upload Words:</strong> You
                    can upload a text file with your own set of words. Supported
                    formats include .txt and others.
                  </p>
                </div>
                <div className="modal_item item_3 flex items-start space-x-4 space-x-2 mb-4">
                  <FaRegLightbulb className="modal_icon icon_3 text-yellow-500 w-20 h-6" />
                  <p className="text-lg leading-5 tracking-wide font-sans font-bold">
                    <strong className="text-yellow-600">Hints:</strong> Use
                    hints if you get stuck. Each hint will reveal one letter of
                    the word.
                  </p>
                </div>
                <div className="modal_item item_4 flex items-start space-x-4 space-x-2 mb-4">
                  <MdUpload className="modal_icon icon_4 text-red-500 w-20 h-6" />
                  <p className="text-lg leading-5 tracking-wide font-sans font-bold">
                    <strong className="text-red-600">Leaderboard:</strong> Check
                    out the top players on the leaderboard. Aim for the highest
                    score!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MenuModalWrapper>
  );
};

export default MenuModal;
