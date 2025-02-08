import styled from "styled-components";

const LoadingScreenWrapper = styled.div`
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

  @keyframes dotBlink {
    0%,
    100% {
      opacity: 0.2;
    }
    50% {
      opacity: 1;
    }
  }

  .dot {
    display: inline-block;
    background-color: white;
    border-radius: 50%;
    margin: 0 0.3rem;
    opacity: 0;
    animation: dotBlink 2s infinite;
  }

  .dot:nth-child(1) {
    animation-delay: 0.1s;
  }

  .dot:nth-child(2) {
    animation-delay: 0.5s;
  }

  .dot:nth-child(3) {
    animation-delay: 1s;
  }

  @media (max-width: 480px) {
    .container {
      width: 95%;
    }
  }

  @media (max-width: 380px) {
    // .label_welcome {
    //   font-size: 8vw;
    // }
  }
`;

export default LoadingScreenWrapper;
