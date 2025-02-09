import styled from "styled-components";

const LeaderboardWrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 20px;
  z-index: 50;

  .leaderboard_modal {
    background: linear-gradient(135deg, #ffffff 0%, #f3e8ff 100%);
    box-shadow: rgba(168, 85, 247, 0.15) 0px 10px 50px,
      rgba(168, 85, 247, 0.1) 0px 5px 20px;
    padding: 32px 28px;
    position: relative;
    overflow: hidden;
    bottom: -6px;
    right: -6px;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: linear-gradient(
        90deg,
        #4c1d95 0%,
        #7e22ce 20%,
        #a855f7 40%,
        #7e22ce 60%,
        #4c1d95 80%
      );
      background-size: 200% 100%;
      animation: gradientMove 1.5s linear infinite;
    }
  }

  @keyframes gradientMove {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }

  .close_leaderboard_btn {
    position: absolute;
    top: 12px;
    right: 12px;
    color: #7e22ce;
    background: rgba(168, 85, 247, 0.1);
    padding: 6px;
    border-radius: 50%;
    transition: all 0.3s ease;
    z-index: 2;

    svg {
      transition: transform 0.3s ease;
    }

    &:hover {
      background: #7e22ce;
      color: white;

      svg {
        transform: rotate(180deg);
      }
    }
  }

  .leaderboard_heading {
    position: relative;
    font-size: 2rem;
    font-weight: 800;
    color: #4c1d95;
    margin: 8px 0 2rem;
    padding-right: 32px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .trophy_icon {
    width: 40px;
    height: 40px;
    filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.5));
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  .leaderboard_list {
    position: relative;
    max-height: 320px;
    overflow-y: auto;
    padding-right: 8px;
    mask-image: linear-gradient(to bottom, black 90%, transparent 100%);
  }

  .leaderboard_list::-webkit-scrollbar {
    width: 4px;
  }

  .leaderboard_list::-webkit-scrollbar-track {
    background: rgba(168, 85, 247, 0.1);
    border-radius: 10px;
  }

  .leaderboard_list::-webkit-scrollbar-thumb {
    background: rgba(168, 85, 247, 0.3);
    border-radius: 10px;
  }

  .list_header {
    display: grid;
    grid-template-columns: 80px 1fr 100px;
    gap: 16px;
    padding: 14px 20px;
    font-weight: 600;
    color: #4c1d95;
    background: rgba(168, 85, 247, 0.08);
    border-radius: 16px;
    margin-bottom: 16px;
    backdrop-filter: blur(4px);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 0.9rem;
    text-align: center;

    span:first-child {
      text-align: left;
    }
    span:last-child {
      text-align: right;
    }
  }

  .list_item {
    display: grid;
    grid-template-columns: 80px 1fr 100px;
    gap: 16px;
    padding: 12px 20px;
    border-radius: 16px;
    margin-bottom: 10px;
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.7);
    border: 2px solid transparent;
    position: relative;
    overflow: hidden;
    text-align: center;

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(168, 85, 247, 0.1),
        transparent
      );
      transform: translateX(-100%);
      transition: transform 0.5s ease;
    }

    &:hover {
      transform: translateX(-4px) translateY(-2px);
      border-color: rgba(168, 85, 247, 0.2);
      box-shadow: rgba(168, 85, 247, 0.1) 0px 4px 12px;

      &::before {
        transform: translateX(100%);
      }
    }
  }

  .rank {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 700;
    font-size: 1.1rem;
    text-align: left;
  }

  .rank_1 {
    color: #fbbf24;
    text-shadow: 0 0 10px rgba(251, 191, 36, 0.3);
  }

  .rank_2 {
    color: #94a3b8;
    text-shadow: 0 0 10px rgba(148, 163, 184, 0.3);
  }

  .rank_3 {
    color: #b45309;
    text-shadow: 0 0 10px rgba(180, 83, 9, 0.3);
  }

  .name {
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: #4c1d95;
    font-size: 1.1rem;
  }

  .score {
    color: #7e22ce;
    font-weight: 700;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    font-size: 1.1rem;
  }

  .score_icon {
    color: #fbbf24;
    filter: drop-shadow(0 0 4px rgba(251, 191, 36, 0.4));
    animation: spin 4s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .empty_state {
    text-align: center;
    padding: 40px 20px;
    color: #7e22ce;
    background: rgba(168, 85, 247, 0.05);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    border: 2px dashed rgba(168, 85, 247, 0.2);
    font-size: 1.1rem;
    font-weight: 500;

    svg {
      animation: bounce 2s ease infinite;
    }
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @media (max-width: 480px) {
    padding: 16px;

    .leaderboard_modal {
      width: 320px !important;
      padding: 24px 16px;
    }

    .close_leaderboard_btn {
      top: 13px;
      right: 10px;
      padding: 5px;

      svg {
        width: 20px;
        height: 20px;
      }
    }

    .leaderboard_heading {
      font-size: 1.5rem;
      margin: 6px 0 1.5rem;
      padding-right: 24px;
    }

    .trophy_icon {
      width: 32px;
      height: 32px;
    }

    .list_header,
    .list_item {
      grid-template-columns: 70px 1fr 80px;
      gap: 8px;
      padding: 10px 16px;
    }

    .rank,
    .name,
    .score {
      font-size: 1rem;
    }
  }
`;

export default LeaderboardWrapper;
