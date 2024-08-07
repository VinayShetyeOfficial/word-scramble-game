import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlayScreenWrapper from "./PlayScreenWrapper";
import MenuModal from "../MenuModal/MenuModal";
import useSoundEffects from "../../hooks/useSoundEffects"; // Import sound effects hook
import { GamepadIcon, TrophyIcon, ClockIcon } from "../../assets/assets";
import { TfiMenu } from "react-icons/tfi";
import { RiFileUploadFill } from "react-icons/ri";

const PlayScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true); // State for sound effects toggle
  const { playHoverSound, playClickSound } = useSoundEffects(); // Destructure the sound functions

  const handleMenuClick = () => {
    if (soundOn) playClickSound(); // Play click sound if soundOn is true
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleSound = () => {
    setSoundOn(!soundOn); // Toggle sound effects
  };

  return (
    <PlayScreenWrapper className="bg-purple-700 min-h-screen flex flex-col">
      {/* Header */}
      <div className="navbar bg-transparent text-white p-4 flex justify-evenly items-center text-2xl">
        <button
          className="menu_btn tracking-wider ml-8 bg-amber-700 text-2xl text-white rounded-full shadow-lg transform transition-transform duration-1000"
          onClick={handleMenuClick}
          onMouseEnter={soundOn ? playHoverSound : null} // Play hover sound if soundOn is true
        >
          <span className="menu_btn_text bg-gradient-to-br inline-flex items-center from-amber-400 via-amber-500 to-amber-600 w-full px-8 py-4 rounded-full -translate-y-1 hover:bg-gradient-to-tl active:-translate-y-0 transition-opacity duration-1000">
            <TfiMenu className="menu_btn_icon w-8 h-8 mr-2" />
            <span className="btn_label">Menu</span>
          </span>
        </button>
        <div className="game_bar select-none flex items-center space-x-10 space-x-5px rounded-xl py-5 px-8">
          <div className="flex items-center drop-shadow-[3px_2px_0px_var(--tw-shadow-color)] shadow-violet-900">
            <img
              src={GamepadIcon}
              alt="Gamepad"
              className="game_bar_icon w-8 h-8 mr-3"
            />
            <span>Round: 5</span>
          </div>
          <div className="flex items-center drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-violet-900">
            <img
              src={TrophyIcon}
              alt="Trophy"
              className="game_bar_icon w-8 h-8 mr-3"
            />
            <span>Score: 120</span>
          </div>
          <div className="flex items-center drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-violet-900">
            <img
              src={ClockIcon}
              alt="Clock"
              className="game_bar_icon w-8 h-8 mr-3"
            />
            <span>Time: 1 : 23</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-8">
        <div className="play_box bg-purple-500 rounded-xl p-12 w-full max-w-xl">
          <h1 className="text-6xl font-bold select-none text-white mb-8 text-center tracking-wider drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-violet-800">
            Guess the Word
          </h1>
          <div className="word_box bg-purple-400 rounded-lg p-10 mb-8">
            <p className="text-5xl select-none font-bold text-white text-center tracking-widest drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-violet-700">
              ELPPA
            </p>
          </div>
          <div className="input_wrapper flex space-x-4">
            <input
              type="text"
              placeholder="Enter your guess"
              className="answer_field flex-grow tracking-wider uppercase text-2xl bg-purple-400 text-white placeholder-purple-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              className="submit_btn tracking-wider ml-8 bg-green-700 text-2xl text-white rounded-full shadow-lg transform transition-transform duration-1000"
              onMouseEnter={soundOn ? playHoverSound : null} // Play hover sound if soundOn is true
              onClick={soundOn ? playClickSound : null} // Play click sound if soundOn is true
            >
              <span className="submit_btn_text bg-gradient-to-br from-green-400 via-green-500 to-green-600 block px-10 py-4 rounded-full -translate-y-1 hover:bg-gradient-to-tl active:-translate-y-0 transition-opacity duration-1000">
                Submit
              </span>
            </button>
          </div>
        </div>
        <button
          className="upload_btn mx-auto mt-10 bg-amber-700 text-2xl text-white rounded-full shadow-lg transform transition-transform duration-1000"
          onMouseEnter={soundOn ? playHoverSound : null} // Play hover sound if soundOn is true
          onClick={soundOn ? playClickSound : null} // Play click sound if soundOn is true
        >
          <span className="upload_btn_text tracking-wider bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 w-full block px-10 py-4 rounded-full -translate-y-1 hover:bg-gradient-to-tl active:-translate-y-0 transition-opacity duration-1000 inline-flex items-center">
            <RiFileUploadFill alt="Upload" className="w-7 h-7 mr-2" />
            Word File
          </span>
        </button>
        <br />
      </div>

      {/* Menu Modal */}
      <MenuModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </PlayScreenWrapper>
  );
};

export default PlayScreen;
