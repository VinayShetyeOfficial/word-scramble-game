import { wordList, getWordsByLength } from "../data/words";

export const getWordForRound = (round, userWords = {}, gameWords = {}) => {
  // Determine word length based on round (4 letters for rounds 1-5, 5 letters for 6-10, etc.)
  const wordLength = Math.floor((round - 1) / 5) + 4;

  // Get words of current length
  const availableWords = getWordsByLength(wordLength);

  // Get a random word from available words
  const randomIndex = Math.floor(Math.random() * availableWords.length);
  return availableWords[randomIndex];
};

export const categorizeWords = (words) => {
  return words.reduce((acc, word) => {
    const length = word.length;
    if (!acc[length]) acc[length] = [];
    acc[length].push(word);
    return acc;
  }, {});
};

const scrambleWord = (word) => {
  const letters = word.split("");
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  return letters.join("");
};

// Track used words for each length
const usedWordsMap = {};

const getUniqueWord = (words, length) => {
  if (!usedWordsMap[length]) {
    usedWordsMap[length] = new Set();
  }

  let availableWords = words.filter((word) => !usedWordsMap[length].has(word));

  if (availableWords.length === 0) {
    // Reset used words set if all words have been used
    usedWordsMap[length].clear();
    availableWords = words;
  }

  const randomIndex = Math.floor(Math.random() * availableWords.length);
  const word = availableWords[randomIndex];
  usedWordsMap[length].add(word);

  return word;
};
