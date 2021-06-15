import React from 'react';

const EndGame = ({ restartGame, player1Score, player2Score }) => (
  <div className="justify-center">
    <h1 className={`${player1Score === player2Score ? "hidden" : ""}`}>Game Over! Congrats to Player {player1Score > player2Score ? '1' : '2'} for winning with a score of {Math.max(player1Score, player2Score) }</h1>
    <h1 className={`${player1Score === player2Score ? "" : "hidden"}`}>Game Over! The game ended in a tie! Want to play again to decide a winner?</h1>
    <button className="restart-button" onClick={restartGame}>Restart Game</button>
  </div>
);

export default EndGame;