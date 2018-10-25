import React, { Component } from "react";
import M from "materialize-css";

export default class GameEnd extends Component {
  // get a reference to the element after the component has mounted
  componentDidMount() {
    const instance = M.Modal.init(this.gameEndModal);
    //instance.open(); //for now keep open at start
  }
  componentDidUpdate() {
    const props = this.props;
    if (this.gameEndModal) {
      var pSum = Number(props.playerSum);
      var dSum = Number(props.dealerSum);
      const instance = M.Modal.getInstance(this.gameEndModal);
      if (
        pSum > 21 ||
        dSum > 21 ||
        props.player.length > 4 ||
        props.dealer.length > 4
      ) {
        instance.open();
      } else if (props.turn === "dealer" && dSum > pSum) {
        instance.open();
      } else {
        instance.close();
      }
    }
  }
  playerWon(pSum, dSum, playerCards, dealerCards) {
    //this logic need refining for all win scenarios
    var won = false;
    if (pSum > 21) {
      won = false;
    } else if (dSum > 21) {
      won = true;
    } else if (
      dSum <= 21 &&
      dSum > pSum &&
      this.props.turn === "dealer" &&
      dealerCards > 4
    ) {
      won = false;
    } else if (pSum <= 21 && playerCards > 4) {
      won = true;
    } else if (pSum <= 21 && dealerCards > 4 && dSum < pSum) {
      won = true;
    } else if (pSum <= 21 && dSum > 21) {
      won = true;
    } else {
      won = false;
    }
    return won;
  }
  render() {
    let props = this.props;
    let pSum = Number(props.playerSum);
    let dSum = Number(props.dealerSum);
    let modalClass = "game-done modal";
    //the text that appears in the modal
    let gameEnd = <p>OH NO YOU LOST!</p>;
    if (this.playerWon(pSum, dSum, props.player.length, props.dealer.length)) {
      gameEnd = <p>CONGRADULATIONS, YOU WON!</p>;
    }
    return (
      <div
        className={modalClass}
        ref={gameEndModal => {
          this.gameEndModal = gameEndModal;
        }}
      >
        <div className="modal-content text-center">
          <h4>Game Over</h4>
          {gameEnd}
          <div className="container">
            <div className="row">
              <div className="col s6 text-center">
                Player: {props.playerSum}
              </div>
              <div className="col s6 text-center">
                Dealer: {props.dealerSum}
              </div>
            </div>
          </div>
          <p className="text-center">
            <button
              className="btn"
              onClick={ev => {
                ev.preventDefault();
                //debugger;
                var props = this.props;
                var winsPlayer = props.winsPlayer;
                var winsDealer = props.winsDealer;
                if (
                  this.playerWon(
                    props.playerSum,
                    props.dealerSum,
                    props.player.length,
                    props.dealer.length
                  )
                ) {
                  winsPlayer++;
                } else {
                  winsDealer++;
                }
                props.endAction(winsPlayer, winsDealer);
                const instance = M.Modal.getInstance(this.gameEndModal);
                instance.close();
              }}
            >
              CLOSE
            </button>
          </p>
        </div>
      </div>
    );
  }
}

//if enough time should add propTypes
