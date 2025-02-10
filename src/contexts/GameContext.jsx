import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { getWordsByLength, wordList } from "../data/words";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameMode, setGameMode] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState(null);
  // Used words is kept as state here
  const [usedWords, setUsedWords] = useState(new Set());
  const [userWords, setUserWords] = useState({});
  const currentWordLength = useRef(4);

  // Get valid word lengths from the default word list (keys sorted ascending)
  const validWordLengths = Object.keys(wordList)
    .map(Number)
    .sort((a, b) => a - b);

  const getNextWord = () => {
    // CUSTOM WORDS MODE
    if (Object.keys(userWords).length > 0) {
      try {
        const availableLengths = Object.keys(userWords)
          .map(Number)
          .sort((a, b) => a - b);
        if (availableLengths.length === 0) return null;

        // Debug info for custom mode (optional)
        const usedWordsArray = Array.from(usedWords);
        const allWords = Object.values(userWords).flat();
        const unusedAllWords = allWords.filter(
          (word) => !usedWords.has(word.original)
        );
        if (usedWordsArray.length > 0) {
          console.log(`
========================================
Custom Words Mode
========================================
Total Words Available: ${allWords.length}
Used Words: ${usedWordsArray.length}
Used Words List: [${usedWordsArray.join(", ")}]
Remaining Words: ${unusedAllWords.length}
Remaining Word List: [${unusedAllWords.map((w) => w.original).join(", ")}]
========================================`);
        }

        const currentLengthWords = userWords[currentWordLength.current] || [];
        const unusedWords = currentLengthWords.filter(
          (word) => !usedWords.has(word.original)
        );

        if (unusedWords.length === 0) {
          const availableLengthsWithWords = availableLengths.filter((length) =>
            userWords[length].some((word) => !usedWords.has(word.original))
          );

          if (availableLengthsWithWords.length === 0) {
            // All custom words used: reset usedWords and start over
            setUsedWords(new Set());
            currentWordLength.current = availableLengths[0];
            return userWords[currentWordLength.current][0];
          }

          const randomLength =
            availableLengthsWithWords[
              Math.floor(Math.random() * availableLengthsWithWords.length)
            ];
          currentWordLength.current = randomLength;
          setUsedWords(new Set()); // reset used words for new category
          const unusedWordsInNewLength = userWords[randomLength].filter(
            (word) => !usedWords.has(word.original)
          );
          return unusedWordsInNewLength[
            Math.floor(Math.random() * unusedWordsInNewLength.length)
          ];
        }

        return unusedWords[Math.floor(Math.random() * unusedWords.length)];
      } catch (error) {
        console.error("Error in custom words mode:", error);
        return null;
      }
    }

    // DEFAULT MODE
    try {
      const availableWords = getWordsByLength(currentWordLength.current);
      if (!availableWords || availableWords.length === 0) return null;

      const unusedWords = availableWords.filter((wordObj) => {
        const original = wordObj.original || wordObj;
        return !usedWords.has(original);
      });

      // Debug info for default mode
      const usedWordsArray = Array.from(usedWords);
      if (usedWordsArray.length > 0) {
        console.log(`
========================================
Default Mode - ${currentWordLength.current}-Letter Words
========================================
Total Words Available: ${availableWords.length}
Used Words: ${usedWordsArray.length}
Used Words List: [${usedWordsArray.join(", ")}]
Remaining Words: ${unusedWords.length}
Remaining Word List: [${unusedWords.map((w) => w.original || w).join(", ")}]
========================================`);
      }

      // IMPORTANT CHANGE: Remove "|| usedWordsArray.length >= 10"
      if (unusedWords.length === 0) {
        const currentIndex = validWordLengths.indexOf(
          currentWordLength.current
        );
        const nextLength = validWordLengths[currentIndex + 1];
        if (nextLength) {
          const previousLength = currentWordLength.current;
          currentWordLength.current = nextLength;
          setUsedWords(new Set()); // reset used words for new category
          if (previousLength !== nextLength) {
            setRound(currentIndex + 2);
          }
          return getNextWord();
        } else {
          return null; // Game complete
        }
      }

      const randomWord =
        unusedWords[Math.floor(Math.random() * unusedWords.length)];
      if (randomWord && randomWord.original && randomWord.scrambled) {
        return randomWord;
      }
      const originalWord = randomWord.original || randomWord;
      return {
        original: originalWord,
        scrambled: originalWord
          .split("")
          .sort(() => Math.random() - 0.5)
          .join(""),
      };
    } catch (error) {
      console.error("Error in default word list mode:", error);
      return null;
    }
  };

  const startNewRound = () => {
    try {
      const nextWord = getNextWord();
      if (nextWord) {
        // Add the chosen word to usedWords and update currentWord
        const newUsedWords = new Set(usedWords);
        newUsedWords.add(nextWord.original);
        setUsedWords(newUsedWords);
        setCurrentWord(nextWord);
      }
    } catch (error) {
      console.error("Error starting new round:", error);
    }
  };

  const submitGuess = (guess) => {
    if (!currentWord) return false;
    if (guess.toLowerCase() === currentWord.original.toLowerCase()) {
      const points = currentWord.original.length - 2;
      setScore((prev) => prev + points);

      // Store the word in usedWords state
      const newUsedWords = new Set(usedWords);
      newUsedWords.add(currentWord.original);
      setUsedWords(newUsedWords);

      // Get current player and update their words
      const currentPlayerId = localStorage.getItem("currentPlayerId");
      const players = JSON.parse(localStorage.getItem("players") || "[]");
      const playerIndex = players.findIndex((p) => p.id === currentPlayerId);

      if (playerIndex !== -1) {
        // Determine if it's a custom word or default word
        const isCustomWord = Object.keys(userWords).length > 0;
        const wordList = isCustomWord ? "custom_words" : "default_words";

        // Add word if not already present
        if (!players[playerIndex][wordList].includes(currentWord.original)) {
          players[playerIndex][wordList].push(currentWord.original);
          localStorage.setItem("players", JSON.stringify(players));
        }

        // Update high score immediately after score is updated
        updateHighScore(score + points);
      }

      startNewRound();
      return true;
    }
    return false;
  };

  const uploadWords = async (validWords) => {
    try {
      setUsedWords(new Set());
      const wordsByLength = {};
      validWords.forEach((wordObj) => {
        const word = wordObj.original;
        const length = word.length;
        if (!wordsByLength[length]) {
          wordsByLength[length] = [];
        }
        let scrambled;
        do {
          scrambled = word
            .split("")
            .sort(() => Math.random() - 0.5)
            .join("");
        } while (scrambled === word);
        wordsByLength[length].push({
          original: word,
          scrambled: scrambled,
        });
      });
      setUserWords(wordsByLength);
      return true;
    } catch (error) {
      console.error("Error in uploadWords:", error);
      return false;
    }
  };

  const resetGame = () => {
    // Update high score before resetting if current score is higher
    const currentPlayerId = localStorage.getItem("currentPlayerId");
    if (currentPlayerId) {
      const players = JSON.parse(localStorage.getItem("players") || "[]");
      const playerIndex = players.findIndex((p) => p.id === currentPlayerId);
      if (playerIndex !== -1 && players[playerIndex].high_score < score) {
        players[playerIndex].high_score = score;
        localStorage.setItem("players", JSON.stringify(players));
      }
    }

    // Rest of the reset logic
    setRound(1);
    setScore(0);
    setCurrentWord(null);
    setUsedWords(new Set());
    setUserWords({});
    currentWordLength.current = validWordLengths[0];
    localStorage.removeItem("userWords");

    // Initialize first word from default list
    const defaultWords = getWordsByLength(validWordLengths[0]);
    if (defaultWords && defaultWords.length > 0) {
      const initialWord =
        defaultWords[Math.floor(Math.random() * defaultWords.length)];
      setCurrentWord(initialWord);
      setUsedWords(new Set([initialWord.original]));
    } else {
      setCurrentWord(null);
    }
  };

  useEffect(() => {
    try {
      // Initialize word length based on mode
      if (round === "∞" && Object.keys(userWords).length > 0) {
        const availableLengths = Object.keys(userWords)
          .map(Number)
          .sort((a, b) => a - b);
        currentWordLength.current = availableLengths[0] || 4;
      } else {
        currentWordLength.current = validWordLengths[0];
      }
      if (!currentWord) {
        const firstWord = getNextWord();
        if (firstWord) {
          setCurrentWord(firstWord);
          setUsedWords(new Set([firstWord.original]));
        }
      }
    } catch (error) {
      console.error("Error initializing game:", error);
    }
  }, [round, userWords]);

  // Initialize user data when component mounts
  useEffect(() => {
    const userId =
      localStorage.getItem("userId") || Math.random().toString(36).substr(2, 9);
    localStorage.setItem("userId", userId);
  }, []);

  const updateHighScore = (newScore) => {
    const currentPlayerId = localStorage.getItem("currentPlayerId");
    if (currentPlayerId) {
      const players = JSON.parse(localStorage.getItem("players") || "[]");
      const playerIndex = players.findIndex((p) => p.id === currentPlayerId);
      if (playerIndex !== -1 && players[playerIndex].high_score < newScore) {
        players[playerIndex].high_score = newScore;
        localStorage.setItem("players", JSON.stringify(players));
      }
    }
  };

  const initializePlayerWords = () => {
    const currentPlayerId = localStorage.getItem("currentPlayerId");
    if (currentPlayerId) {
      const players = JSON.parse(localStorage.getItem("players") || "[]");
      const player = players.find((p) => p.id === currentPlayerId);

      if (player) {
        // Initialize the usedWords Set with previously found words
        const foundWords = new Set([
          ...player.default_words,
          ...player.custom_words,
        ]);
        setUsedWords(foundWords);
      }
    }
  };

  // Add to useEffect that runs on component mount
  useEffect(() => {
    initializePlayerWords();
  }, []); // Empty dependency array means this runs once on mount

  const updateFoundWords = (word, isCustomWord = false) => {
    const currentPlayerId = localStorage.getItem("currentPlayerId");
    if (currentPlayerId) {
      const players = JSON.parse(localStorage.getItem("players") || "[]");
      const playerIndex = players.findIndex((p) => p.id === currentPlayerId);

      if (playerIndex !== -1) {
        // Update the appropriate array based on whether it's a custom or default word
        const arrayToUpdate = isCustomWord ? "custom_words" : "default_words";
        if (!players[playerIndex][arrayToUpdate].includes(word)) {
          players[playerIndex][arrayToUpdate].push(word);
          localStorage.setItem("players", JSON.stringify(players));
        }
      }
    }
  };

  const handleCorrectAnswer = () => {
    // Calculate new score based on word length and time remaining
    const timeBonus = Math.floor(timeLeft * 0.1);
    const wordLengthBonus = currentWord ? currentWord.original.length * 2 : 0;
    const roundBonus = round * 5;
    const newScore = score + 10 + timeBonus + wordLengthBonus + roundBonus;

    setScore(newScore);
    updateHighScore(newScore);

    // Update found words in localStorage
    const isCustomWord = Boolean(userWords[currentWord.original.length]);
    updateFoundWords(currentWord.original, isCustomWord);

    // Rest of the handling logic...
  };

  const value = {
    gameMode,
    setGameMode,
    playerName,
    setPlayerName,
    round,
    setRound,
    score,
    setScore,
    currentWord,
    setCurrentWord,
    startNewRound,
    submitGuess,
    uploadWords,
    userWords,
    resetGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

export default GameContext;
