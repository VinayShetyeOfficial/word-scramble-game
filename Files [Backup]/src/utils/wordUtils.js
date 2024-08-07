// const wordUtils = {
//   getRandomWord: () => {
//     const words = ["example", "scramble", "react", "tailwind", "javascript"];
//     return words[Math.floor(Math.random() * words.length)];
//   },
//   scrambleWord: (word) => {
//     const scrambled = word
//       .split("")
//       .sort(() => Math.random() - 0.5)
//       .join("");
//     return scrambled !== word ? scrambled : wordUtils.scrambleWord(word);
//   },
//   checkWord: (original, input) => {
//     return (
//       original.split("").sort().join("") === input.split("").sort().join("")
//     );
//   },
// };

// export default wordUtils;

// Function to shuffle the letters of a word
export const shuffleWord = (word) => {
  const arr = word.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
};

// List of words to be used in the game
export const wordsList = [
  "example",
  "scramble",
  "react",
  "javascript",
  "context",
];
