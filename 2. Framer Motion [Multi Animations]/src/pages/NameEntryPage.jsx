import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NameEntryPageWrapper from "./NameEntryPageWrapper";
import useSoundEffects from "../hooks/useSoundEffects"; // Import sound effects hook
import { inappropriateWords } from "../utils/inappropriateWords";

const NameEntryPage = () => {
  const [animate, setAnimate] = useState(false);
  const [name, setName] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const navigate = useNavigate();
  const { playHoverSound, playClickSound } = useSoundEffects(); // Destructure the sound functions

  const isValidGameName = (name) => {
    // Remove leading/trailing spaces
    const trimmedName = name.trim();

    // Check length (4-15 characters)
    if (trimmedName.length < 4 || trimmedName.length > 15) {
      return false;
    }

    // Allow letters, numbers, underscores and spaces
    const validCharacters = /^[a-zA-Z0-9_ ]+$/;
    if (!validCharacters.test(trimmedName)) {
      return false;
    }

    // Check for inappropriate words
    const lowercaseName = trimmedName.toLowerCase();
    if (inappropriateWords.some((word) => lowercaseName.includes(word))) {
      return false;
    }

    // Check if name starts with a number
    if (/^[0-9]/.test(trimmedName)) {
      return false;
    }

    return true;
  };

  const handleStartGame = () => {
    if (isValidGameName(name)) {
      playClickSound();
      setAnimate(true);
      setTimeout(() => {
        navigate("/load", { state: { playerName: name } });
      }, 1100);
    } else {
      setIsInvalid(true);
      setTimeout(() => {
        setIsInvalid(false);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleStartGame();
    }
  };

  // Allow letters, numbers, underscores, and spaces while typing
  const handleNameChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[a-zA-Z0-9_ ]*$/.test(value)) {
      setName(value);
    }
  };

  return (
    <NameEntryPageWrapper className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-400 via-green-600 to-green-800">
      <div className="container p-2 text-center sm:p-2 md:p-8 lg:p-10">
        <h1 className="label_name text-[2.3rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold select-none text-white mb-0 sm:mb-2 md:mb-2 tracking-wide drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-green-800">
          Enter Your Name
        </h1>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          onKeyPress={handleKeyPress}
          placeholder="Eg. Joe Doe"
          maxLength={15}
          className={`name_field text-xl sm:text-2xl md:text-3xl  
             w-[240px] sm:w-[320px] md:w-[380px] lg:w-[450px] 
             my-4 sm:my-6 md:my-8 text-teal-600 
             p-3 sm:p-4 tracking-wider rounded-lg 
             shadow-md focus:outline-none
             placeholder:text-md placeholder:md:text-xl placeholder:lg:text-2xl
             ${isInvalid ? "invalid" : ""}`}
        />

        <button
          className={`btn_start_game mt-2 sm:mt-3 md:mt-4 select-none bg-blue-700 text-2xl sm:text-3xl md:text-4xl mx-auto text-white rounded-full shadow-lg transform transition-transform duration-1000 ${
            animate ? "scale-15" : ""}`}
          onClick={handleStartGame}
          onMouseEnter={playHoverSound} // Play hover sound
        >
          <span
            className={`btn_start_game-text bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 w-full block px-6 sm:px-8 md:px-10 py-2 sm:py-3 md:py-4 rounded-full -translate-y-1 hover:bg-gradient-to-tl active:-translate-y-0 transition-opacity duration-1000 ${
              animate ? "opacity-0" : "opacity-100"
            }`}
          >
            Start
          </span>
        </button>
      </div>
    </NameEntryPageWrapper>
  );
};

export default NameEntryPage;
