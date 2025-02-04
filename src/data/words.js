// Helper function to shuffle array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const wordList = {
  4: shuffleArray([
    { original: "GAME", scrambled: "MAGE" },
    { original: "PLAY", scrambled: "LAYP" },
    { original: "WORD", scrambled: "ORDW" },
    { original: "TEXT", scrambled: "XETT" },
    { original: "CODE", scrambled: "ODEC" },
    { original: "BOOK", scrambled: "OKBO" },
    { original: "TREE", scrambled: "ERET" },
    { original: "FISH", scrambled: "ISHF" },
    { original: "LOVE", scrambled: "VELO" },
    { original: "HOME", scrambled: "MEHO" },
  ]),
  5: shuffleArray([
    { original: "APPLE", scrambled: "PEPLA" },
    { original: "TABLE", scrambled: "BLETA" },
    { original: "CHAIR", scrambled: "HAICR" },
    { original: "EARTH", scrambled: "THEAR" },
    { original: "WATER", scrambled: "TERWA" },
    { original: "HOUSE", scrambled: "OUHES" },
    { original: "MOUSE", scrambled: "UEMOS" },
    { original: "GREEN", scrambled: "EENGR" },
    { original: "SMILE", scrambled: "LIMES" },
    { original: "DREAM", scrambled: "MREAD" },
  ]),
  6: shuffleArray([
    { original: "PUZZLE", scrambled: "ZLEPUZ" },
    { original: "GARDEN", scrambled: "DANGER" },
    { original: "WINDOW", scrambled: "WODNWI" },
    { original: "PENCIL", scrambled: "CENILP" },
    { original: "FLOWER", scrambled: "WERFLO" },
    { original: "CAMERA", scrambled: "RACAME" },
    { original: "BOTTLE", scrambled: "TTLEBO" },
    { original: "SUNSET", scrambled: "NETUSS" },
    { original: "BRIDGE", scrambled: "GERIBD" },
    { original: "COFFEE", scrambled: "EEFCOF" },
  ]),
  7: shuffleArray([
    { original: "DOLPHIN", scrambled: "LPHODIN" },
    { original: "HARMONY", scrambled: "MONYHAR" },
    { original: "RAINBOW", scrambled: "WRANIBO" },
    { original: "DIAMOND", scrambled: "MONDDIA" },
    { original: "FANTASY", scrambled: "YFATSNA" },
    { original: "JOURNEY", scrambled: "OJRUNYE" },
    { original: "LIBRARY", scrambled: "BIRALRY" },
    { original: "SPINACH", scrambled: "INPSAHC" },
    { original: "MORNING", scrambled: "GNIRNMO" },
    { original: "WEATHER", scrambled: "HTREAEW" },
  ]),
  8: shuffleArray([
    { original: "ELEPHANT", scrambled: "PHEANTLS" },
    { original: "DINOSAUR", scrambled: "OSNUIDAR" },
    { original: "SUNSHINE", scrambled: "SSEHNUNI" },
    { original: "AIRPLANE", scrambled: "RAELIPAN" },
    { original: "COMPUTER", scrambled: "MTCOPREU" },
    { original: "DARKNESS", scrambled: "ARKNESSD" },
    { original: "PAINTING", scrambled: "AINTINGP" },
    { original: "BIRTHDAY", scrambled: "IRTHDAYB" },
    { original: "TREASURE", scrambled: "REASURTE" },
    { original: "BUTTERFLY", scrambled: "UTTERFLYB" },
  ]),
  9: shuffleArray([
    { original: "BEAUTIFUL", scrambled: "FULBEAUTI" },
    { original: "DISCOVERY", scrambled: "COVERYIDS" },
    { original: "EDUCATION", scrambled: "DUCATIONE" },
    { original: "NEVERMIND", scrambled: "VERMINDNE" },
    { original: "CHALLENGE", scrambled: "LENGECHAL" },
    { original: "WATERFALL", scrambled: "TERFALLWA" },
    { original: "DEVELOPER", scrambled: "VELOPERDE" },
    { original: "CHOCOLATE", scrambled: "HOCOLATEC" },
    { original: "ADVENTURE", scrambled: "DVENTUREA" },
    { original: "KNOWLEDGE", scrambled: "WLEDGEKON" },
  ]),
  10: shuffleArray([
    { original: "ARCHITECTURE", scrambled: "ATRIERCTUEC" },
    { original: "PHOTOGRAPHY", scrambled: "HOPGRTOPAHY" },
    { original: "CONVERSATION", scrambled: "RNCOISAVETON" },
    { original: "HOSPITALITY", scrambled: "HITLOPSAITY" },
    { original: "INTERNET", scrambled: "TITNEREN" },
    { original: "FRIENDSHIP", scrambled: "SHIPFIRNED" },
    { original: "DEMONSTRATE", scrambled: "AODSTRNETEM" },
    { original: "ESTABLISHMENT", scrambled: "BESMNEITLHA" },
    { original: "ORGANIZATION", scrambled: "NRIANIZOGATON" },
  ]),
};

// Add word length validation
export const validateWordLength = (word, expectedLength) => {
  return word.length === expectedLength;
};

// Helper function to get words by length with validation
export const getWordsByLength = (length) => {
  const words = wordList[length] || [];
  return words.filter((word) => validateWordLength(word.original, length));
};
