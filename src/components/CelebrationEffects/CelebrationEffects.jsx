import React, { useState, useCallback, useRef } from "react";
import ReactConfetti from "react-confetti";
import confetti from "canvas-confetti";
import { Fireworks } from "@fireworks-js/react";

const CelebrationEffects = ({ type, isActive, onComplete }) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const confettiRef = useRef(null);

  // Define neon colors array
  const neonColors = [
    "#FF1493", // Deep Pink
    "#00FF00", // Lime Green
    "#FF00FF", // Magenta
    "#00FFFF", // Cyan
    "#FFA500", // Orange
    "#FF0000", // Red
    "#FFFF00", // Yellow
    "#7FFF00", // Chartreuse
    "#1E90FF", // Dodger Blue
    "#FF69B4", // Hot Pink
    "#4B0082", // Indigo
    "#9400D3", // Dark Violet
    "#32CD32", // Lime Green
    "#FF4500", // Orange Red
    "#8A2BE2", // Blue Violet
  ];

  // Enhanced firework effect with multiple bursts
  const fireWork = useCallback(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 100,
      zIndex: 0,
      colors: neonColors,
      scalar: 1.2,
      shapes: ["circle", "square", "star"],
      disableForReducedMotion: true,
      decay: 0.95,
      gravity: 1.5,
      drift: 0,
      brightness: {
        min: 50,
        max: 80,
      },
      opacity: 0.8,
    };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 60 * (timeLeft / duration);

      // Main burst
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.2, 0.8), y: Math.random() - 0.2 },
        colors: [
          neonColors[Math.floor(Math.random() * neonColors.length)],
          neonColors[Math.floor(Math.random() * neonColors.length)],
          neonColors[Math.floor(Math.random() * neonColors.length)],
        ],
      });

      // Secondary bursts with different colors
      if (Math.random() > 0.5) {
        confetti({
          ...defaults,
          particleCount: particleCount * 0.6,
          origin: { x: randomInRange(0.3, 0.7), y: Math.random() - 0.1 },
          colors: [
            neonColors[Math.floor(Math.random() * neonColors.length)],
            neonColors[Math.floor(Math.random() * neonColors.length)],
          ],
          gravity: 1.2,
          scalar: 0.9,
        });
      }

      // Add spiral effect occasionally
      if (Math.random() > 0.9) {
        const particleCount = 12;
        const angleStep = (Math.PI * 2) / particleCount;
        const radiusStep = 0.1;

        for (let i = 0; i < particleCount; i++) {
          const angle = i * angleStep;
          const radius = i * radiusStep;
          confetti({
            ...defaults,
            particleCount: 3,
            angle: (angle * 180) / Math.PI,
            spread: 15,
            origin: {
              x: 0.5 + Math.cos(angle) * radius,
              y: 0.5 + Math.sin(angle) * radius,
            },
            colors: [neonColors[i % neonColors.length]],
            ticks: 150,
          });
        }
      }
    }, 200);
  }, []);

  // Enhanced star burst with spiral pattern
  const starBurst = useCallback(() => {
    const count = 3;
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: neonColors,
      shapes: ["star"],
      scalar: 1,
    };

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 80,
        origin: { x: 0.5, y: 0.75 },
      });
    };

    // Create multiple bursts with delay
    for (let i = 0; i < count; i++) {
      setTimeout(shoot, i * 200);
    }

    // Add spiral effect
    const spiral = () => {
      const particleCount = 10;
      const angleStep = (Math.PI * 2) / particleCount;
      const radiusStep = 0.1;

      for (let i = 0; i < particleCount; i++) {
        const angle = i * angleStep;
        const radius = i * radiusStep;
        confetti({
          ...defaults,
          particleCount: 3,
          angle: (angle * 180) / Math.PI,
          spread: 10,
          origin: {
            x: 0.5 + Math.cos(angle) * radius,
            y: 0.5 + Math.sin(angle) * radius,
          },
          colors: [neonColors[i % neonColors.length]],
        });
      }
    };

    setTimeout(spiral, count * 200);
  }, []);

  // Enhanced side sweep with wave pattern
  const sideSweep = useCallback(() => {
    const end = Date.now() + 3000;

    // Define neon color combinations
    const colorCombos = [
      // Neon pink & purple combo
      ["#FF00FF", "#FF1493", "#FF00E6", "#FF69B4"],
      // Neon blue combo
      ["#00FFFF", "#00F5FF", "#00BFFF", "#1E90FF"],
      // Neon green combo
      ["#39FF14", "#00FF00", "#7FFF00", "#00FF7F"],
      // Neon orange & red combo
      ["#FF4500", "#FF0000", "#FF2400", "#FF3800"],
      // Neon yellow combo
      ["#FFFF00", "#FFD700", "#FFF000", "#FFEA00"],
      // Neon mixed combo 1
      ["#FF00FF", "#00FFFF", "#39FF14", "#FFFF00"],
      // Neon mixed combo 2
      ["#FF1493", "#00F5FF", "#7FFF00", "#FF4500"],
    ];

    (function frame() {
      // Get random color combo for each burst
      const currentCombo =
        colorCombos[Math.floor(Math.random() * colorCombos.length)];

      // Left side wave
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.5 },
        colors: currentCombo,
        shapes: ["circle", "square"],
        scalar: 1.2,
        drift: 1,
        ticks: 200,
      });

      // Right side wave - use same color combo for symmetry
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.5 },
        colors: currentCombo,
        shapes: ["circle", "square"],
        scalar: 1.2,
        drift: -1,
        ticks: 200,
      });

      // Center fountain - use a different random combo
      if (Math.random() > 0.95) {
        const fountainCombo =
          colorCombos[Math.floor(Math.random() * colorCombos.length)];
        confetti({
          particleCount: 5,
          angle: 90,
          spread: 45,
          origin: { x: 0.5, y: 0.7 },
          colors: fountainCombo,
          shapes: ["circle"],
          ticks: 150,
          scalar: 1.5,
        });
      }

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  // Modified rocket blast implementation - removed useCallback
  const RocketBlastEffect = () => (
    <Fireworks
      options={{
        hue: {
          min: 0,
          max: 345,
        },
        acceleration: 1.02,
        brightness: {
          min: 50,
          max: 80,
        },
        decay: {
          min: 0.015,
          max: 0.03,
        },
        delay: {
          min: 30,
          max: 60,
        },
        explosion: 5,
        flickering: 50,
        intensity: 30,
        friction: 0.97,
        gravity: 1.5,
        opacity: 0.5,
        particles: 90,
        traceLength: 3,
        traceSpeed: 10,
        rocketsPoint: {
          min: 50,
          max: 50,
        },
        lineWidth: {
          explosion: {
            min: 1,
            max: 4,
          },
          trace: {
            min: 0.1,
            max: 1,
          },
        },
        lineStyle: "round",
        mouse: {
          click: false,
          move: false,
          max: 1,
        },
      }}
      style={{
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        position: "fixed",
        background: "transparent",
        zIndex: 999,
      }}
    />
  );

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
          sideSweep();
          break;
        default:
          break;
      }
    }
  }, [isActive, type, fireWork, starBurst, sideSweep]);

  return (
    <>
      {isActive && type === "confetti" && (
        <ReactConfetti
          ref={confettiRef}
          width={dimensions.width}
          height={dimensions.height}
          recycle={false}
          numberOfPieces={300}
          colors={neonColors}
          gravity={0.25}
          friction={0.99}
          opacity={0.9}
          run={isActive}
          onConfettiComplete={() => {
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 4000);
          }}
        />
      )}
      {isActive && type === "rockets" && <RocketBlastEffect />}
    </>
  );
};

export default CelebrationEffects;
