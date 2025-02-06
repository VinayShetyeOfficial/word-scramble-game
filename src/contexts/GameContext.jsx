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
  const [userWords, setUserWords] = useState({});
  const [usedWords, setUsedWords] = useState(new Set());
  const currentWordLength = useRef(4);

  // Dynamically generate valid word lengths from wordList
  const validWordLengths = Object.keys(wordList)
    .map(Number)
    .sort((a, b) => a - b);

  const getNextWord = () => {
    // Check if we have custom words and we're in infinite mode
    if (Object.keys(userWords).length > 0) {
      try {
        // Get all available lengths from user uploaded words
        const availableLengths = Object.keys(userWords)
          .map(Number)
          .sort((a, b) => a - b);

        if (availableLengths.length === 0) return null;

        // Get current category words
        const currentLengthWords = userWords[currentWordLength.current] || [];
        const unusedWords = currentLengthWords.filter(
          (word) => !usedWords.has(word.original)
        );

        // Debug information
        const usedWordsArray = Array.from(usedWords);
        const allWords = Object.values(userWords).flat();
        const unusedAllWords = allWords.filter(
          (word) => !usedWords.has(word.original)
        );

        if (usedWordsArray.length > 0) {
          const debugInfo = `
========================================
Custom Words Mode
========================================
Total Words Available: ${allWords.length}
Used Words: ${usedWordsArray.length}
Used Words List: [${usedWordsArray.join(", ")}]
Remaining Words: ${unusedAllWords.length}
Remaining Word List: [${unusedAllWords.map((w) => w.original).join(", ")}]
========================================`;

          console.log(debugInfo);
        }

        if (unusedWords.length === 0) {
          // Pick a random length that has unused words
          const availableLengthsWithWords = availableLengths.filter((length) =>
            userWords[length].some((word) => !usedWords.has(word.original))
          );

          if (availableLengthsWithWords.length === 0) {
            // All words have been used, reset usedWords and continue
            setUsedWords(new Set());
            currentWordLength.current = availableLengths[0];
            return userWords[currentWordLength.current][0];
          }

          // Set new random length
          const randomLength =
            availableLengthsWithWords[
              Math.floor(Math.random() * availableLengthsWithWords.length)
            ];
          currentWordLength.current = randomLength;
          const unusedWordsInNewLength = userWords[randomLength].filter(
            (word) => !usedWords.has(word.original)
          );
          return unusedWordsInNewLength[
            Math.floor(Math.random() * unusedWordsInNewLength.length)
          ];
        }

        // Return random unused word from current length
        return unusedWords[Math.floor(Math.random() * unusedWords.length)];
      } catch (error) {
        console.error("Error in custom words mode:", error);
        return null;
      }
    }

    // Default word list mode only if no custom words available
    try {
      const availableWords = getWordsByLength(currentWordLength.current);
      if (!availableWords || availableWords.length === 0) return null;

      const unusedWords = availableWords.filter((wordObj) => {
        const original = wordObj.original || wordObj;
        return !usedWords.has(original);
      });

      // Debug information for default mode
      const usedWordsArray = Array.from(usedWords);
      if (usedWordsArray.length > 0) {
        const debugInfo = `
========================================
Default Mode - ${currentWordLength.current}-Letter Words
========================================
Total Words Available: ${availableWords.length}
Used Words: ${usedWordsArray.length}
Used Words List: [${usedWordsArray.join(", ")}]
Remaining Words: ${unusedWords.length}
Remaining Word List: [${unusedWords.map((w) => w.original || w).join(", ")}]
========================================`;

        console.log(debugInfo);
      }

      if (unusedWords.length === 0) {
        const nextLength =
          validWordLengths[
            validWordLengths.indexOf(currentWordLength.current) + 1
          ];
        if (!nextLength) {
          return null;
        }
        currentWordLength.current = nextLength;
        return getNextWord();
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
      // Calculate points: word length - 2
      const points = currentWord.original.length - 2;
      setScore((prev) => prev + points);

      // Update used words
      const newUsedWords = new Set(usedWords);
      newUsedWords.add(currentWord.original);
      setUsedWords(newUsedWords);

      // Get next word
      startNewRound();
      return true;
    }
    return false;
  };

  const uploadWords = async (validWords) => {
    try {
      // Clear previous game's used words when switching to custom mode
      setUsedWords(new Set());

      // Group words by length
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
      console.log("Valid words:", validWords);
      console.log("Words grouped by length:", wordsByLength);

      // Save to localStorage
      localStorage.setItem("userWords", JSON.stringify(wordsByLength));
      console.log("Saved to localStorage:", JSON.stringify(wordsByLength));

      return true;
    } catch (error) {
      console.error("Error in uploadWords:", error);
      return false;
    }
  };

  // Initialize first word when game starts
  useEffect(() => {
    try {
      // Set initial word length to the smallest valid length
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
