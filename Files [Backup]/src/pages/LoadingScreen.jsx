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

    return () => clearTimeout(timer); // Clear the timeout if the component unmounts
  }, [navigate]);

  return (
    <LoadingScreenWrapper className="min-h-screen select-none flex justify-center items-center bg-gradient-to-br from-blue-400 via-blue-600 to-blue-800">
      <div className="p-10 text-center">
        <h1 className="text-5xl font-bold text-white mb-8 tracking-widest drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-blue-800">
          Welcome, {playerName}!
        </h1>
        <p className="text-3xl text-white tracking-wider drop-shadow-[3px_3px_0px_var(--tw-shadow-color)] shadow-blue-900 text-balance">
          Your game will start soon
          <span className="dot-container">
            <span className="dot drop-shadow-[2px_2px_1px_var(--tw-shadow-color)] shadow-blue-800 "></span>
            <span className="dot drop-shadow-[2px_2px_1px_var(--tw-shadow-color)] shadow-blue-800 "></span>
            <span className="dot drop-shadow-[2px_2px_1px_var(--tw-shadow-color)] shadow-blue-800 "></span>
          </span>
        </p>
      </div>
    </LoadingScreenWrapper>
  );
};

export default LoadingScreen;
