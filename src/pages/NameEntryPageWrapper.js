import styled from "styled-components";

const NameEntryPageWrapper = styled.div`
  .name_field {
    box-shadow: rgba(0, 0, 0, 0.4) 0px 3px 6px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -4px 0px inset;
    transition: all 0.3s ease;
    margin-inline: auto;
  }

  .name_field:focus {
    box-shadow: rgba(0, 0, 0, 0.5) 0px 5px 8px,
      rgba(0, 0, 0, 0.4) 0px 9px 15px -3px,
      rgba(0, 0, 0, 0.3) 0px -4px 0px inset;
    transform: translateY(-2px);
  }

  .name_field::-webkit-input-placeholder {
    text-shadow: none;
    opacity: 0.7;
  }

  .btn_start_game {
    transition: transform 1s ease-in-out;
    transition-delay: 0.8s;
    display: block;
    margin-inline: auto;
  }

  .btn_start_game.scale-15 {
    transform: scale(15);
  }

  .btn_start_game-text {
    transition: opacity 1s linear;
  }

  .btn_start_game-text.opacity-0 {
    opacity: 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    animation: fadeIn 0.5s ease-in;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 480px) {
    .container {
      width: 95%;
    }
  }

  @media (max-width: 320px) {
    .label_name {
      font-size: 2rem;
    }

    .name_field {
      width: 100%;
    }
  }
`;

export default NameEntryPageWrapper;
