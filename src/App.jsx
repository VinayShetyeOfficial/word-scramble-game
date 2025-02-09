import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RouteGuard from "./components/RouteGuard/RouteGuard";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import NameEntryPage from "./pages/NameEntryPage";
import LoadingScreen from "./pages/LoadingScreen";
import PlayScreen from "./components/PlayScreen/PlayScreen";
import Instructions from "./components/Instructions/Instructions";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import { MusicProvider } from "./contexts/MusicContext";
import { GameProvider } from "./contexts/GameContext";

const App = () => {
  useEffect(() => {
    // Clear any existing user data when app first loads
    if (window.location.pathname === "/") {
      localStorage.removeItem("userId");
      localStorage.removeItem("playerName");
      localStorage.removeItem("username");
    }
  }, []);

  return (
    <GameProvider>
      <MusicProvider>
        <Router>
          <RouteGuard>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/enter-name" element={<NameEntryPage />} />
              <Route path="/load" element={<LoadingScreen />} />
              <Route path="/playScreen" element={<PlayScreen />} />
              <Route path="/instructions" element={<Instructions />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </RouteGuard>
        </Router>
      </MusicProvider>
    </GameProvider>
  );
};

export default App;
