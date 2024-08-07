import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NameEntryPageWrapper from "./NameEntryPageWrapper";
import useSoundEffects from "../hooks/useSoundEffects"; // Import sound effects hook

const NameEntryPage = () => {
  const [animate, setAnimate] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { playHoverSound, playClickSound } = useSoundEffects(); // Destructure the sound functions

  const handleStartGame = () => {
    if (name.trim() !== "") {
      playClickSound(); // Play click sound
      setAnimate(true);
      setTimeout(() => {
        navigate("/load", { state: { playerName: name } });
      }, 1100);
    }
  };

  return (
    <NameEntryPageWrapper className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-400 via-green-600 to-green-800">
      <div className="container p-10 text-center">
        <h1 className="label_name text-7xl font-bold select-none text-white mb-5 tracking-wide drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-green-800">
          Enter Your Name
        </h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="name_field text-3xl my-8 text-teal-600 p-4 tracking-wider rounded-lg md:shadow-lg shadow-md focus:outline-none outline outline-0 focus:outline-0 border-0"
        />
        <button
          className={`btn_start_game mt-4 ml-8 select-none bg-blue-700 text-4xl mx-auto text-white rounded-full shadow-lg transform transition-transform duration-1000 ${
            animate ? "scale-15" : ""
          }`}
          onClick={handleStartGame}
          onMouseEnter={playHoverSound} // Play hover sound
        >
          <span
            className={`btn_start_game-text bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 w-full block px-10 py-4 rounded-full -translate-y-1 hover:bg-gradient-to-tl active:-translate-y-0 transition-opacity duration-1000 ${
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
