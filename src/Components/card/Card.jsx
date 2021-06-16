import React from 'react';

const Card = ({ id, flipped, handleClick, cardNumber }) => (
  <div className="pad">
    <button id={id} className={`card ${cardNumber !== -1 ? "" : "hide-card"} ${flipped ? "card-front" : "card-back"}`} onClick={handleClick} key="back">
      <div className={`${flipped ? "" : "transparent"}`}>{ cardNumber }</div>
    </button>
  </div>
);

export default Card;