import { inappropriateWords } from "./inappropriateWords";

// Convert array to Set for better performance
const inappropriateWordsSet = new Set(inappropriateWords);

// Helper function to check if a word contains any inappropriate content
const containsInappropriateContent = async (word) => {
  word = word.toLowerCase();

  // First check local list (fastest) - EXACT MATCH ONLY
  if (inappropriateWords.includes(word)) {
    return true;
  }

  try {
    // Try PurgoMalum API first (free, no key needed)
    const purgoResponse = await fetch(
      `https://www.purgomalum.com/service/containsprofanity?text=${encodeURIComponent(
        word
      )}`
    );

    if (purgoResponse.ok) {
      const isProfane = await purgoResponse.text();
      if (isProfane === "true") {
        return true;
      }
    }

    // If PurgoMalum check passes, try Perspective API
    try {
      const perspectiveResponse = await fetch(
        "https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=" +
          PERSPECTIVE_API_KEY,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            comment: { text: word },
            languages: ["en"],
            requestedAttributes: {
              TOXICITY: {},
              PROFANITY: {},
            },
          }),
        }
      );

      if (perspectiveResponse.ok) {
        const data = await perspectiveResponse.json();
        if (
          data?.attributeScores?.TOXICITY?.summaryScore?.value > 0.7 ||
          data?.attributeScores?.PROFANITY?.summaryScore?.value > 0.7
        ) {
          return true;
        }
      }
    } catch (perspectiveError) {
      console.log(
        "Perspective API check failed, continuing with other checks:",
        perspectiveError
      );
    }

    // Final local list check - EXACT MATCH ONLY
    return inappropriateWords.includes(word);
  } catch (error) {
    console.error(
      "Error checking with APIs, falling back to local list:",
      error
    );
    // Fallback to local check - EXACT MATCH ONLY
    return inappropriateWords.includes(word);
  }
};

const PERSPECTIVE_API_KEY = "AIzaSyAf5EAuB50X5Gupponx4EIwkmRNKxhgYKU";
const checkToxicity = async (text) => {
  try {
    const response = await fetch(
      "https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=" +
        PERSPECTIVE_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment: { text },
          languages: ["en"],
          requestedAttributes: {
            TOXICITY: {},
            SEVERE_TOXICITY: {},
            IDENTITY_ATTACK: {},
            PROFANITY: {},
          },
        }),
      }
    );

    const data = await response.json();
    const toxicityScore = data.attributeScores.TOXICITY.summaryScore.value;
    const profanityScore = data.attributeScores.PROFANITY.summaryScore.value;

    return toxicityScore > 0.7 || profanityScore > 0.7;
  } catch (error) {
    console.error("Error checking toxicity:", error);
    return false;
  }
};

const checkInappropriate = async (word) => {
  try {
    const response = await fetch(
      `https://www.purgomalum.com/service/containsprofanity?text=${encodeURIComponent(
        word
      )}`
    );
    const result = await response.text();
    return result === "true";
  } catch (error) {
    console.error("Error checking profanity:", error);
    return false;
  }
};

export const validateWords = async (words) => {
  const validWords = [];
  const invalidWords = [];
  const rejectedWords = [];

  for (const word of words) {
    try {
      // Skip if word contains numbers or special characters
      if (!/^[a-zA-Z]+$/.test(word)) {
        invalidWords.push({ word, reason: "Contains invalid characters" });
        continue;
      }

      // Skip if word length is not between 4-10
      if (word.length < 4 || word.length > 10) {
        invalidWords.push({ word, reason: "Invalid length" });
        continue;
      }

      // Check for inappropriate content using multiple methods
      const isInappropriate = await containsInappropriateContent(word);
      if (isInappropriate) {
        console.log(`Rejected inappropriate word: ${word}`);
        rejectedWords.push({ word, reason: "Inappropriate content" });
        continue;
      }

      // Check if word exists in dictionary
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );

      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          validWords.push(word);
        } else {
          invalidWords.push({ word, reason: "Not found in dictionary" });
        }
      } else {
        invalidWords.push({ word, reason: "Not found in dictionary" });
      }
    } catch (error) {
      console.error(`Error checking word "${word}":`, error);
      invalidWords.push({ word, reason: "API error" });
    }
  }

  console.log("Validation complete:", {
    valid: validWords,
    invalid: invalidWords.map((w) => `${w.word} (${w.reason})`),
    rejected: rejectedWords.map((w) => `${w.word} (${w.reason})`),
  });

  return { validWords, invalidWords, rejectedWords };
};
