import styled from "styled-components";

const LoadingScreenWrapper = styled.div`
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
    width: 8px;
    height: 8px;
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
`;

export default LoadingScreenWrapper;
