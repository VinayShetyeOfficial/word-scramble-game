export const predefinedWords = {
  4: [
    "game",
    "play",
    "word",
    "text",
    "code",
    "book",
    "tree",
    "fish",
    "love",
    "home",
  ],
  5: [
    "apple",
    "table",
    "chair",
    "earth",
    "water",
    "house",
    "mouse",
    "green",
    "smile",
    "dream",
  ],
  6: [
    "banana",
    "circle",
    "orange",
    "planet",
    "rocket",
    "school",
    "animal",
    "garden",
    "window",
    "friend",
  ],
  7: [
    "picture",
    "morning",
    "evening",
    "program",
    "holiday",
    "village",
    "journey",
    "network",
    "weather",
    "history",
  ],
  8: [
    "elephant",
    "building",
    "computer",
    "football",
    "language",
    "mountain",
    "industry",
    "sentence",
    "question",
    "children",
  ],
  9: [
    "adventure",
    "beautiful",
    "dangerous",
    "equipment",
    "invisible",
    "knowledge",
    "literature",
    "mechanism",
    "operation",
    "photograph",
  ],
  10: [
    "apartment",
    "dictionary",
    "electricity",
    "friendship",
    "generation",
    "helicopter",
    "instrument",
    "landscapes",
    "meditation",
    "occupation",
  ],
};

export const categorizeWords = (words) => {
  return words.reduce((categories, word) => {
    const length = word.length;
    if (!categories[length]) {
      categories[length] = [];
    }
    categories[length].push(word);
    return categories;
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

export const getWordForRound = (round, userWords, gameWords) => {
  const wordLength = 4 + Math.floor((round - 1) / 5);
  let availableWords = (userWords[wordLength] || []).concat(
    gameWords[wordLength] || []
  );

  let word = getUniqueWord(availableWords, wordLength);

  if (!word) {
    // Fallback to predefined words if no user words available
    word = getUniqueWord(predefinedWords[wordLength], wordLength);
    if (!word) {
      throw new Error(`No words available for length ${wordLength}`);
    }
  }

  return { word, scrambled: scrambleWord(word) };
};
