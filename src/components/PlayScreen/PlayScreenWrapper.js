import styled from "styled-components";

const PlayScreenWrapper = styled.div`
  .game_bar {
    display: flex;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 16px;
    backdrop-filter: blur(10.8px);
    -webkit-backdrop-filter: blur(10.8px);
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  }

  .game_bar_icon {
    filter: drop-shadow(0 0 1px #7e22ce) drop-shadow(0 0 1px #7e22ce)
      drop-shadow(0 0 2px #7e22ce);
    transition: all 0.3s ease;
  }

  .answer_field {
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  }

  .answer_field::placeholder {
    text-transform: none;
  }

  .play_box {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  }

  .word_box .game-lives {
    position: absolute;
    top: 12px;
    right: 16px;
    color: #e03c3c;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    filter: drop-shadow(1px 1px 2px rgba(255, 255, 255, 0.5));
  }

  .game-lives .game-life-icon {
    width: 20px;
    height: 20px;
    transition: all 0.3s ease;
    filter: drop-shadow(0 0 2px #a855f7) drop-shadow(0 0 4px #a855f7)
      drop-shadow(0 0 6px #a855f7);

    &.lost {
      color: #666;
      opacity: 0.5;
      transform: scale(0.9);
      filter: none;
    }
  }

  .word_box {
    position: relative;
    background: rgba(255, 255, 255, 0.26);
    border-radius: 16px;
    backdrop-filter: blur(16.7px);
    -webkit-backdrop-filter: blur(16.7px);
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  }

  .guess-input.disabled {
    background-color: #f0f0f0;
    color: #666;
    cursor: not-allowed;
  }

  .guess-input.disabled::placeholder {
    color: #666;
  }

  @media (max-width: 900px) {
    .navbar {
      padding: 0;
      justify-content: space-between;
      background: rgba(255, 255, 255, 0.3);
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
        rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
        rgba(0, 0, 0, 0.2) 0px -4px 0px inset;
    }

    .menu_btn,
    .menu_btn_icon {
      margin: 0;
    }

    .menu_btn,
    .menu_btn_text {
      border-radius: 0;
    }

    .btn_label {
      display: none;
    }

    .game_bar {
      width: 100%;
      margin: 0;
      box-shadow: none;
      justify-content: flex-end;
      border-radius: 0;
      background-color: transparent;
      backdrop-filter: blur(0px);
    }

    .game-lives {
      top: 10px;
      right: 14px;
      gap: 6px;
    }

    .game-life-icon {
      width: 18px;
      height: 18px;
    }
  }

  @media (max-width: 700px) {
    .game_bar {
      padding: 6px 15px;
    }

    .game_bar span {
      font-size: 20px;
    }

    .menu_btn_text {
      padding: 12px;
    }

    .menu_btn_icon {
      width: 20px;
      height: 20px;
    }

    .game_bar_icon {
      display: none;
    }
  }

  @media (max-width: 650px) {
    .play_box {
      padding: 38px 28px 30px 28px;
    }

    .play_box h1 {
      font-size: 50px;
      margin-bottom: 25px;
    }

    .word_box {
      padding: 30px 25px;
      margin-bottom: 25px;
    }

    .word_box p {
      font-size: 40px;
    }

    .input_wrapper {
      flex-direction: column;
    }

    .input_wrapper .submit_btn {
      display: block;
      margin: 25px auto 0;
      max-width: fit-content;
    }

    .game-lives {
      top: 8px;
      right: 12px;
      gap: 5px;
    }

    .game-life-icon {
      width: 16px;
      height: 16px;
    }
  }

  @media (max-width: 506px) {
    .play_box h1 {
      font-size: 40px;
    }

    .word_box {
      padding: 30px 25px;
      margin-bottom: 25px;
    }

    .word_box p {
      font-size: 30px;
    }

    .space-x-5px > :not([hidden]) ~ :not([hidden]) {
      --tw-space-x-reverse: 0;
      margin-right: calc(16px * var(--tw-space-x-reverse));
      margin-left: calc(16px * calc(1 - var(--tw-space-x-reverse)));
    }

    .submit_btn_text,
    .upload_btn_text {
      font-size: 20px;
      padding: 13px 20px;
    }

    .game-lives {
      top: 7px;
      right: 10px;
      gap: 3px;
    }

    .game-lives .game-life-icon {
      width: 18px;
      height: 18px;
    }
  }

  @media (max-width: 430px) {
    .play_box {
      padding: 24px;
    }

    .play_box h1 {
      font-size: 28px;
      margin-bottom: 25px;
    }

    .word_box p {
      font-size: 24px;
    }

    .input_wrapper input {
      font-size: 18px;
      padding: 12px;
    }

    .submit_btn_text,
    .upload_btn_text {
      font-size: 16px;
      padding: 8px 18px;
    }

    .game_bar span {
      font-size: 16px;
    }

    .game-lives {
      top: 6px;
      right: 8px;
      gap: 3px;
    }

    .game-life-icon {
      width: 12px;
      height: 12px;
    }
  }

  @media (max-width: 320px) {
    .playscreen_main {
      padding: 0.7rem;
    }

    .play_box_heading,
    .word_box {
      margin-bottom: 15px !important;
    }

    .word_box_container {
      padding: 1rem;
    }

    .modal_box {
      padding: 15px 20px !important;
    }

    .help_modal_heading {
      font-size: 20px !important;
    }

    .modal_items {
      padding-bottom: 20px !important;
    }

    .game_bar .label {
      font-size: 12px;
    }

    .game_bar span {
      font-size: 14px;
    }

    .game-lives {
      top: 5px;
      right: 6px;
      gap: 3px;
    }

    .game-life-icon {
      width: 10px;
      height: 10px;
    }
  }

  .answer_field.invalid {
    animation: invalidShake 1s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  @keyframes invalidShake {
    0%,
    100% {
      color: #ffffff;
    }
    20%,
    60% {
      color: #e03c3c;
    }
    40%,
    80% {
      color: #ffffff;
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      transform: translateX(-1px);
    }
    20%,
    40%,
    60%,
    80% {
      transform: translateX(1px);
    }
  }
`;

export default PlayScreenWrapper;
