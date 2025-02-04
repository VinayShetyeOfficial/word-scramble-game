import { useLocation, useNavigate } from "react-router-dom";
import LoadingScreenWrapper from "./LoadingScreenWrapper";
import React, { useState, useEffect } from "react";

const LoadingScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { playerName } = location.state || { playerName: "Player" };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/playScreen");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <LoadingScreenWrapper className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-400 via-blue-600 to-blue-800">
      <div className="container p-4 text-center sm:p-6 md:p-8 lg:p-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 md:mb-5 lg:mb-8 tracking-widest drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-blue-800">
          <span className="block sm:inline">Welcome</span>
          <span className="block sm:inline sm:ml-3">{playerName}!</span>
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-3xl text-white tracking-wider drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-blue-900">
          Your game will start soon
          <span className="ml-2 dot-container sm:ml-3">
            <span className="dot w-[6px] h-[6px] sm:w-[7px] sm:h-[7px] md:w-[8px] md:h-[8px] drop-shadow-[2px_2px_1px_var(--tw-shadow-color)] shadow-blue-800"></span>
            <span className="dot w-[6px] h-[6px] sm:w-[7px] sm:h-[7px] md:w-[8px] md:h-[8px] drop-shadow-[2px_2px_1px_var(--tw-shadow-color)] shadow-blue-800"></span>
            <span className="dot w-[6px] h-[6px] sm:w-[7px] sm:h-[7px] md:w-[8px] md:h-[8px] drop-shadow-[2px_2px_1px_var(--tw-shadow-color)] shadow-blue-800"></span>
          </span>
        </p>
      </div>
    </LoadingScreenWrapper>
  );
};

export default LoadingScreen;
