import React, { useState, useCallback, useRef } from "react";
import ReactConfetti from "react-confetti";
import confetti from "canvas-confetti";

const CelebrationEffects = ({ type, isActive, onComplete }) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const confettiRef = useRef(null);

  // Fire effect
  const fireWork = useCallback(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  }, []);

  // Stars effect
  const starBurst = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FFD700", "#FFA500", "#FF4500"],
    });
  }, []);

  // School pride effect
  const schoolPride = useCallback(() => {
    const end = Date.now() + 3000;

    const colors = ["#bb0000", "#ffffff"];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  React.useEffect(() => {
    if (isActive) {
      switch (type) {
        case "confetti":
          // Default confetti handled by ReactConfetti
          break;
        case "firework":
          fireWork();
          break;
        case "stars":
          starBurst();
          break;
        case "pride":
          schoolPride();
          break;
        default:
          break;
      }
    }
  }, [isActive, type, fireWork, starBurst, schoolPride]);

  return (
    <>
      {isActive && type === "confetti" && (
        <ReactConfetti
          ref={confettiRef}
          width={dimensions.width}
          height={dimensions.height}
          recycle={false}
          numberOfPieces={200}
          onConfettiComplete={() => {
            if (onComplete) onComplete();
          }}
        />
      )}
    </>
  );
};

export default CelebrationEffects;
