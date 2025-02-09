import styled from "styled-components";

const WordsFoundWrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;

  .words_found_modal {
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -4px 0px inset;
    background: white;
    max-width: 28rem;
    width: 100%;
    padding: 2rem;
    height: auto;
    min-height: 400px;
    max-height: 70vh;
    display: flex;
    flex-direction: column;
  }

  .words_found_heading {
    position: sticky;
    top: 10px;
    margin-bottom: 1.5rem;
    flex-shrink: 0;
  }

  .words_found_items {
    flex: 1;
    overflow-y: auto;
    padding-right: 1rem;
    padding-bottom: 20px;
  }

  .words_found_items::-webkit-scrollbar {
    width: 4px;
  }

  .words_found_items::-webkit-scrollbar-track {
    padding-left: 50px;
    background: #f1f1f1;
    border-radius: 20px;
  }

  .words_found_items::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background: #888;
    opacity: 0.5;
  }

  .mask-fade-bottom {
    mask-image: linear-gradient(
      to bottom,
      black calc(100% - 20px),
      transparent 100%
    );
    -webkit-mask-image: linear-gradient(
      to bottom,
      black calc(100% - 20px),
      transparent 100%
    );
  }

  @media (max-width: 612px) {
    .words_found_modal {
      max-width: 70%;
      padding: 2rem;
      max-height: 60vh;
    }

    .words_found_modal h3 {
      font-size: 24px;
    }
  }

  @media (max-width: 532px) {
    .words_found_modal {
      max-width: 80%;
      padding: 20px 15px;
      max-height: 80vh;
    }
  }

  @media (max-width: 320px) {
    .words_found_heading {
      font-size: 20px;
    }

    .close_words_found_btn {
      width: 2rem;
      right: 5px;
    }
  }
`;

export default WordsFoundWrapper;
