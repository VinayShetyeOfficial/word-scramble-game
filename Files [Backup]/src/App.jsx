import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import NameEntryPage from "./pages/NameEntryPage";
import LoadingScreen from "./pages/LoadingScreen";
import PlayScreen from "./components/PlayScreen/PlayScreen";
import Instructions from "./components/Instructions/Instructions";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import GameProvider from "./contexts/GameContext";
import { MusicProvider } from "./contexts/MusicContext"; // Import MusicProvider
import MusicController from "./components/MusicController/MusicController";

function App() {
  return (
    <GameProvider>
      <MusicProvider>
        {" "}
        {/* Wrap the Router with MusicProvider */}
        <Router>
          <MusicController />
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/enter-name" element={<NameEntryPage />} />
            <Route path="/load" element={<LoadingScreen />} />
            <Route path="/playScreen" element={<PlayScreen />} />
            <Route path="/instructions" element={<Instructions />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </Router>
      </MusicProvider>
    </GameProvider>
  );
}

export default App;
