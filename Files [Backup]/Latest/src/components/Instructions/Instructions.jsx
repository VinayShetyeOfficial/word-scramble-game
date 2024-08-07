import InstructionsWrapper from "./InstructionsWrapper";

const Instructions = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 via-green-600 to-green-700">
      <h1 className="text-5xl font-bold text-white mb-8">Game Instructions</h1>
      <p className="text-3xl text-white text-center">
        Welcome to the Word Scramble Game! The objective is simple: unscramble
        the given word. You can choose different game modes and even upload your
        own list of words. Have fun and try to get the highest score!
      </p>
    </div>
  );
};

export default Instructions;
