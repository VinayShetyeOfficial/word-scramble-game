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
    const availableWords = getWordsByLength(currentWordLength.current);
    const userWordsOfLength = userWords[currentWordLength.current] || [];
    const allWords = [...availableWords, ...userWordsOfLength];

    // Get used words for all categories
    const usedWordsArray = Array.from(usedWords);
    const categoriesUsed = {};

    // Group words by their length, maintaining history
    usedWordsArray.forEach((word) => {
      const wordString =
        typeof word === "string" ? word : word?.original || word;
      const length = wordString.length;
      const categoryNum = validWordLengths.indexOf(length) + 1; // Category number based on index

      if (!categoriesUsed[categoryNum]) {
        categoriesUsed[categoryNum] = [];
      }
      categoriesUsed[categoryNum].push(wordString);
    });

    // Get current category number
    const currentCategory =
      validWordLengths.indexOf(currentWordLength.current) + 1;

    // Filter remaining words to only show current category length
    const remainingWords = allWords
      .filter((word) => {
        const wordString =
          typeof word === "string" ? word : word?.original || word;
        return (
          !usedWordsArray.includes(word) && !usedWordsArray.includes(wordString)
        );
      })
      .map((word) =>
        typeof word === "string" ? word : word?.original || word
      );

    // Only show debug info if we have at least one correct answer
    if (usedWordsArray.length > 0) {
      const debugInfo = `
========================================
Category ${currentCategory} [${currentWordLength.current}-Letter Words]
========================================
Total Words in Category: ${allWords.length}

Used Words by Category:
-----------------------
${Object.entries(categoriesUsed)
  .map(([cat, words]) => `Category ${cat} => [${words.join(", ")}]`)
  .join("\n")}

Remaining Words in Current Category:
----------------------------------
[${remainingWords.join(", ")}]

Progress:
---------
Words Completed: ${categoriesUsed[currentCategory]?.length || 0}/${
        allWords.length
      }
========================================`;

      console.log(debugInfo);
    }

    if (remainingWords.length === 0) {
      // Find the next valid word length
      const currentIndex = validWordLengths.indexOf(currentWordLength.current);
      const nextIndex = currentIndex + 1;

      if (nextIndex < validWordLengths.length) {
        currentWordLength.current = validWordLengths[nextIndex];
        setRound((prev) => prev + 1);

        const newLengthWords = getWordsByLength(currentWordLength.current);
        if (newLengthWords.length > 0) {
          return newLengthWords[0];
        }
      }
      return null;
    }

    const randomIndex = Math.floor(Math.random() * remainingWords.length);
    const nextWord = allWords.find((word) => {
      const wordString =
        typeof word === "string" ? word : word?.original || word;
      return wordString === remainingWords[randomIndex];
    });
    return nextWord;
  };

  const startNewRound = () => {
    const nextWord = getNextWord();
    if (nextWord) {
      // Update used words first
      const newUsedWords = new Set(usedWords);
      newUsedWords.add(nextWord.original);
      setUsedWords(newUsedWords);

      // Then set the current word
      setCurrentWord(nextWord);
    }
  };

  const submitGuess = (guess) => {
    if (!currentWord) return false;

    if (guess.toLowerCase() === currentWord.original.toLowerCase()) {
      // Calculate points: word length - 2
      const points = currentWord.original.length - 2;
      setScore((prev) => prev + points);

      // Update used words immediately
      const newUsedWords = new Set(usedWords);
      newUsedWords.add(currentWord.original);
      setUsedWords(newUsedWords);

      // Get next word
      startNewRound();
      return true;
    }
    return false;
  };

  const uploadWords = (words) => {
    try {
      // Debug incoming data
      console.log("uploadWords received:", words);

      // Basic validation
      if (!words || !Array.isArray(words)) {
        console.error("Invalid input: expected array, got:", typeof words);
        return false;
      }

      // Ensure we have words to process
      if (words.length === 0) {
        console.error("Empty words array received");
        return false;
      }

      // Validate each word object
      const validWords = words.filter((word) => {
        const isValid =
          word &&
          typeof word === "object" &&
          typeof word.original === "string" &&
          typeof word.scrambled === "string" &&
          word.original.length >= 4 &&
          word.original.length <= 10;

        if (!isValid) {
          console.log("Invalid word object:", word);
        }
        return isValid;
      });

      console.log("Valid words:", validWords);

      if (validWords.length === 0) {
        console.error("No valid words after filtering");
        return false;
      }

      // Group words by length
      const wordsByLength = {};
      validWords.forEach((word) => {
        const len = word.original.length;
        if (!wordsByLength[len]) {
          wordsByLength[len] = [];
        }
        wordsByLength[len].push(word);
      });

      console.log("Words grouped by length:", wordsByLength);

      // Save to localStorage
      const saveData = JSON.stringify(wordsByLength);
      localStorage.setItem("userWords", saveData);
      console.log("Saved to localStorage:", saveData);

      // Update context state
      setUserWords(wordsByLength);
      setRound("∞"); // Set to infinite rounds for custom words
      setScore(0); // Reset score

      return true;
    } catch (error) {
      console.error("Error in uploadWords:", error);
      return false;
    }
  };

  // Initialize first word when game starts
  useEffect(() => {
    // Set initial word length to the smallest valid length
    currentWordLength.current = validWordLengths[0];

    if (!currentWord) {
      const firstWord = getNextWord();
      if (firstWord) {
        setCurrentWord(firstWord);
        setUsedWords(new Set([firstWord.original]));
      }
    }
  }, []);

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
