import React from 'react';

const GameInfoHeader = ({ restartGame, currentPlayer, player1Score, player2Score }) => (
  <div className="grid-header-container">
    <div className={`justify-left current-player ${currentPlayer > 0 ? "player-1" : "player-2"}`}>Currently Choosing: {currentPlayer > 0 ? "Player 1" : "Player 2"}</div>
    <div className="justify-center scoreboard">Player 1: {player1Score}  Player 2: {player2Score}</div>
    <div className="justify-end">
      <button onClick={restartGame} className="restart-button">Restart Game</button>
    </div>
  </div>
);

export default GameInfoHeader;