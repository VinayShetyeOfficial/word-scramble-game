import wrong1 from "../assets/audio/answer_status/wrong_1.mp3";
import wrong2 from "../assets/audio/answer_status/wrong_2.mp3";
import wrong3 from "../assets/audio/answer_status/wrong_3.mp3";
import wrong4 from "../assets/audio/answer_status/wrong_4.mp3";
import wrong5 from "../assets/audio/answer_status/wrong_5.mp3";
import wrong6 from "../assets/audio/answer_status/wrong_6.mp3";

import correct1 from "../assets/audio/answer_status/correct_1.mp3";
import correct2 from "../assets/audio/answer_status/correct_2.mp3";
import correct3 from "../assets/audio/answer_status/correct_3.mp3";
import correct4 from "../assets/audio/answer_status/correct_4.mp3";
import correct5 from "../assets/audio/answer_status/correct_5.mp3";
import correct6 from "../assets/audio/answer_status/correct_6.mp3";

export const wrongAnswerSounds = [
  wrong1,
  wrong2,
  wrong3,
  wrong4,
  wrong5,
  wrong6,
];
export const correctAnswerSounds = [
  correct1,
  correct2,
  correct3,
  correct4,
  correct5,
  correct6,
];

export const playRandomSound = (soundArray) => {
  const randomIndex = Math.floor(Math.random() * soundArray.length);
  const audio = new Audio(soundArray[randomIndex]);
  audio.play();
};

export const playRandomWrongSound = () => playRandomSound(wrongAnswerSounds);
export const playRandomCorrectSound = () =>
  playRandomSound(correctAnswerSounds);
