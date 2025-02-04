import styled from "styled-components";

const PlayScreenWrapper = styled.div`
  .game_bar {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 16px;
    backdrop-filter: blur(10.8px);
    -webkit-backdrop-filter: blur(10.8px);
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  }

  .answer_field {
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  }

  .answer_field::placeholder {
    text-transform: none;
  }

  .play_box {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  }

  .word_box {
    background: rgba(255, 255, 255, 0.26);
    border-radius: 16px;
    backdrop-filter: blur(16.7px);
    -webkit-backdrop-filter: blur(16.7px);
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
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
      padding: 16px;
    }
  }

  @media (max-width: 700px) {
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

    @media (max-width: 540px) {
      .navbar {
      }

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

      .help_modal {
      }

      .help_modal_heading {
        font-size: 20px !important;
      }

      .modal_items {
        padding-bottom: 20px !important;
      }
    }
  }
`;

export default PlayScreenWrapper;
