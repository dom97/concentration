import React, { PureComponent } from 'react';
import GameInfoHeader from './Components/gameinfoheader/GameInfoHeader';
import Card from './Components/card/Card';
import EndGame from './Components/endgame/EndGame';

import './main.css';

const PAIRS = 10
const PLAYER_1 = 1
const HIDDEN = -1
const FACE_DOWN = false
const DISPLAY_TIME = 800

class App extends PureComponent {

  state = { 
    flippedArray: Array(20).fill(false),
    deck: App.generateDeck(),
    numSelected: 1,
    prevSelectedCard: -1,
    prevCardId: -1,
    currentPlayer: 1,
    player1Score: 0,
    player2Score: 0,
    pauseClick: false,
  };


  static shuffleDeck = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  }
  static generateDeck = () => {
    let deck = Array.from(Array(PAIRS).keys())
    deck = deck.concat([...deck])
    App.shuffleDeck(deck)
    return deck;
  };

  handleClick = event => {
    event.preventDefault();
    if (!this.state.pauseClick) {
      const cardId = event.target.id;
      const isFlipped = this.state.flippedArray.slice();
  
      if (!isFlipped[cardId]) {
        isFlipped[cardId] = !isFlipped[cardId];
        this.setState(prevState => ({ 
          prevSelectedCard: prevState.deck[cardId],
          prevCardId: cardId,
          flippedArray: isFlipped,
          numSelected: prevState.numSelected + 1
        }));
  
        if (this.state.numSelected === 2) {
          this.setState(prevState => ({ 
            numSelected: 1,
            pauseClick: true
           }));
          const prevCardId = this.state.prevCardId;
          const newCard = this.state.deck[cardId];
          const previousCard = this.state.prevSelectedCard;
  
          this.checkCardMatch(previousCard, newCard, prevCardId, cardId);
        }
      }
    }
  };

  checkCardMatch = (card1, card2, card1Id, card2Id) => {
    if (card1 === card2) {
      const updatedDeck = this.state.deck.slice();
      updatedDeck[card1Id] = HIDDEN;
      updatedDeck[card2Id] = HIDDEN;
      if (this.state.currentPlayer === PLAYER_1) {
        this.setState(prevState => ({
          player1Score: prevState.player1Score + 1
        }))
        setTimeout(() => {
          this.setState({
            deck: updatedDeck,
            pauseClick: false,
          })
        }, DISPLAY_TIME);
      } else {
        this.setState(prevState => ({
          player2Score: prevState.player2Score + 1
        }))
        setTimeout(() => {
          this.setState({
            deck: updatedDeck,
            pauseClick: false,
          })
        }, DISPLAY_TIME);
      }
    } else {
      this.flipBackCards(card1Id, card2Id)
    }
  };

  flipBackCards = (card1Id, card2Id) => {
    const updatedFlipped = this.state.flippedArray.slice()
    updatedFlipped[card1Id] = FACE_DOWN;
    updatedFlipped[card2Id] = FACE_DOWN;
    setTimeout(() => {
      this.setState(prevState => ({ 
        flippedArray: updatedFlipped,
        currentPlayer: prevState.currentPlayer * -1,
        pauseClick: false,
      }));
    }, DISPLAY_TIME);
  }

  restartGame = () => {
    this.setState({
      flippedArray: Array(PAIRS * 2).fill(false),
      deck: App.generateDeck(),
      numSelected: 1,
      prevSelectedCard: -1,
      prevCardId: -1,
      currentPlayer: 1,
      player1Score: 0,
      player2Score: 0,
      pauseClick: false
    });
  };

  EndGame = () => {
    return this.state.flippedArray.every((element, index, array) => element !== false);
  };

  render() {
    return (
     <div>
       <GameInfoHeader
          restartGame={this.restartGame}
          currentPlayer={this.state.currentPlayer}
          player1Score={this.state.player1Score}
          player2Score={this.state.player2Score}
        />
       { this.EndGame() ? <EndGame
        restartGame={this.restartGame}
        player1Score={this.state.player1Score}
        player2Score={this.state.player2Score}
         /> :
       <div className="grid-container">
          {
            this.state.deck.map((cardNumber, index) => 
              <Card
                key={index} 
                id={index} 
                cardNumber={cardNumber} 
                flipped={this.state.flippedArray[index]} 
                handleClick={this.handleClick}     
              />
            )
          }
        </div>
       }
     </div>
    );
  }
}

export default App;