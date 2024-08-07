import styled from "styled-components";

const NameEntryPageWrapper = styled.div`
  .name_field {
    box-shadow: rgba(0, 0, 0, 0.4) 0px 3px 6px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -4px 0px inset;
  }

  .name_field::-webkit-input-placeholder {
    text-shadow: none;
  }

  .btn_start_game {
    transition: transform 1s ease-in-out;
    transition-delay: 0.8s;
  }

  .btn_start_game.scale-15 {
    transform: scale(20);
  }

  .btn_start_game-text {
    transition: opacity 1s linear;
  }

  .btn_start_game-text.opacity-0 {
    opacity: 0;
  }

  @media (max-width: 875px) {
    .container {
      padding: 20px;
    }

    .label_name {
      font-size: 4rem;
      margin-bottom: 0;
    }

    .name_field,
    .btn_start_game {
      font-size: 1.8rem;
    }

    .name_field {
      padding: 0.75rem;
      margin: 1.5625rem 0;
    }

    .btn_start_game {
      display: block;
      margin-inline: auto;
    }
  }

  @media (max-width: 420px) {
    .label_name {
      font-size: 3.5rem;
      margin-bottom: 0;
    }

    .name_field,
    .btn_start_game {
      font-size: 1.6rem;
    }

    .name_field {
      display: block;
      width: 100%;
    }

    .btn_start_game {
      display: block;
      margin: auto;
    }
  }
`;

export default NameEntryPageWrapper;
