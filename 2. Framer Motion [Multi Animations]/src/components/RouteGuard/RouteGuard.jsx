import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMusic } from "../../contexts/MusicContext";

const RouteGuard = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetGame } = useMusic();

  useEffect(() => {
    // Only run this on mount
    const isPageRefresh =
      performance.navigation && performance.navigation.type === 1;
    const isHomeRoute = location.pathname === "/";

    // Only redirect if it's specifically a page refresh (not initial load or navigation)
    if (isPageRefresh && !isHomeRoute) {
      resetGame();
      navigate("/", { replace: true });
    }
  }, []); // Empty dependency array means this only runs once on mount

  return children;
};

export default RouteGuard;
